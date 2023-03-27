using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using SalernoServer.Models;
using SalernoServer.Models.ItemModels;

namespace SalernoServer.Controllers
{
    [Route("api/modifier")]
    [ApiController]
    public class ModiferController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ModiferController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/modifiers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Modifier>>> GetModififers()
        {
            // might not work
            return await _context.Modifiers
                .Include(m => m.Groups)
                .ThenInclude(g => g.GroupOptions)
                .Include(m => m.Addons)
                .Include(m => m.NoOptions)
                .ToListAsync();
        }

        // GET: api/modifier/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Modifier>> GetModifier(long id)
        {
            var modifier = await _context.Modifiers
                .Include(m => m.Groups)
                .ThenInclude(g => g.GroupOptions)
                .Include(m => m.Addons)
                .Include(m => m.NoOptions)
                .Where(m => m.ModifierId == id)
                .FirstOrDefaultAsync();

            if (modifier == null)
            {
                return NotFound();
            }

            return modifier;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModifier(long id, [FromBody] ModifierHelper modifier)
        {
            if (modifier == null)
            {
                return BadRequest();
            }
            var foundModifier = await _context.Modifiers.FindAsync(id);
            if (foundModifier == null) return BadRequest($"Modifier ID to update not found: {id}");
            Modifier updatedModifier = new()
            {
                ModifierId = id,
                Name = modifier.Name,
                Description = modifier.Description,
                Item = foundModifier.Item
            };

            foreach (var addon in modifier.Addons)
            {
                var updatedAddon = new Addon
                {
                    AddonId = addon.AddonId,
                    Name = addon.Name,
                    Price = addon.Price,
                    Modifier = foundModifier,
                };
                updatedModifier.Addons.Add(updatedAddon);
            }
            foreach (var noOption in modifier.NoOptions)
            {
                var updatedNoOption = new NoOption
                {
                    NoOptionId = noOption.NoOptionId,
                    Name = noOption.Name,
                    DiscountPrice = noOption.DiscountPrice,
                    Modifier = updatedModifier
                };
                updatedModifier.NoOptions.Add(updatedNoOption);
            }
            foreach (var group in modifier.Groups)
            {
                var updatedGroup = new Group
                {
                    GroupId = group.GroupId,
                    Name = group.Name,
                    Modifier = updatedModifier
                };
                foreach (var groupOption in group.GroupOptions)
                {
                    var updatedGroupOption = new GroupOption
                    {
                        GroupOptionId = groupOption.GroupOptionId,
                        Name = groupOption.Name,
                        Price = groupOption.Price,
                        IsDefault = groupOption.IsDefault,
                        Group = updatedGroup
                    };
                    updatedGroup.GroupOptions.Add(updatedGroupOption);
                }
                updatedModifier.Groups.Add(updatedGroup);
            }
            _context.Modifiers.Remove(foundModifier);
            await _context.SaveChangesAsync();

            await _context.Modifiers.AddAsync(updatedModifier);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/modifiers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostModifier([FromBody] ModifierHelper modifier)
        {
            if (modifier == null)
            {
                return BadRequest();
            }
            var foundModifier = await _context.Modifiers.FindAsync(modifier.ModifierId);
            if (foundModifier is not null)
            {
                _context.Modifiers.Remove(foundModifier);
                await _context.SaveChangesAsync();
            }
            var foundItem = await _context.Items.FindAsync(modifier.ItemId);
            if (foundItem == null) return BadRequest($"Modifier ItemID {modifier.ItemId} not found");
            var newModifier = new Modifier
            {
                Name = modifier.Name,
                Description = modifier.Description,
                ItemId = foundItem.ItemId
            };
            if (modifier.ModifierId != 0)
            {
                newModifier.ModifierId = modifier.ModifierId;
            }
            foreach (var addon in modifier.Addons)
            {
                var newAddon = new Addon
                {
                    Name = addon.Name,
                    Price = addon.Price,
                    Modifier = newModifier
                };
                if (addon.AddonId != 0)
                {
                    newAddon.AddonId = addon.AddonId;
                }
                newModifier.Addons.Add(newAddon);
            }
            foreach (var noOption in modifier.NoOptions)
            {
                var newNoOption = new NoOption
                {
                    Name = noOption.Name,
                    DiscountPrice = noOption.DiscountPrice,
                    Modifier = newModifier
                };
                if (noOption.NoOptionId != 0)
                {
                    newNoOption.NoOptionId = noOption.NoOptionId;
                }
                newModifier.NoOptions.Add(newNoOption);
            }
            foreach (var group in modifier.Groups)
            {
                var newGroup = new Group
                {
                    Name = group.Name,
                    Modifier = newModifier,
                    Description = ""
                };
                if (group.GroupId != 0)
                {
                    newGroup.GroupId = group.GroupId;
                }
                foreach (var groupOption in group.GroupOptions)
                {
                    var newGroupOption = new GroupOption
                    {
                        Name = groupOption.Name,
                        Price = groupOption.Price,
                        IsDefault = groupOption.IsDefault,
                        Group = newGroup
                    };
                    if (groupOption.GroupOptionId != 0)
                    {
                        newGroupOption.GroupOptionId = groupOption.GroupOptionId;
                    }
                    newGroup.GroupOptions.Add(newGroupOption);
                }
                newModifier.Groups.Add(newGroup);
            }
            await _context.Modifiers.AddAsync(newModifier);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetModifier),
                new { id = newModifier.ModifierId },
                newModifier);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(long id)
        {
            var modifier = await _context.Modifiers.FindAsync(id);
            if (modifier == null)
            {
                return NotFound();
            }

            _context.Modifiers.Remove(modifier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ModifierExists(long id)
        {
            return _context.Modifiers.Any(e => e.ModifierId == id);
        }
    }
}
