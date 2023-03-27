using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalernoServer.Models;
using SalernoServer.Models.Authentication; 

namespace SalernoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/employee/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(long id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/employee/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(long id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            var currentEmployee = await _context.Employees.FindAsync(id);
            if (currentEmployee == null)
            {
                return NotFound();
            }
            currentEmployee.FirstName = employee.FirstName;
            currentEmployee.LastName = employee.LastName;
            currentEmployee.Email = employee.Email;
            currentEmployee.PhoneNumber = employee.PhoneNumber;
            currentEmployee.BackOfficeAccess = employee.BackOfficeAccess;
            currentEmployee.RegisterCode = employee.RegisterCode;
            currentEmployee.EmployeeRole = employee.EmployeeRole;

            _context.Update(currentEmployee);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostItem([FromBody] Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetItem", new { id = item.Id }, item);
            return CreatedAtAction(
                nameof(GetEmployee),
                new { id = employee.EmployeeId },
                employee);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(long id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
