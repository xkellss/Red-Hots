import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterButton from '../../components/FilterButton';
import QuestionIcon from "../../components/QuestionIcon";
import ButtonTabs from "../../components/ButtonTabs";
import DeleteItemModal from "../../components/DeleteItemModal";
import axios from 'axios';
import './css/edit.css';

export default function Edit() {
    const { itemId } = useParams();
    const [item, setItem] = useState({
        "itemId": "",
        "name": "",
        "description": "",
        "department": "",
        "categoryId": 0,
        "upc": "",
        "sku": "",
        "price": 0,
        "discountable": false,
        "taxable": false,
        "trackingInventory": false,
        "cost": 0,
        "assignedCost": 0,
        "quantity": 0,
        "reorderTrigger": 0,
        "recommendedOrder": 0,
        "lastSoldDate": new Date(),
        "supplier": "",
        "liabilityItem": false,
        "liabilityRedemptionTender": "",
        "taxGroupOrRate": "0"
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const getItem = async () => {
        await axios.get(`https://localhost:7074/api/items/${itemId}`)
        .then(res => {
            console.log(res.data);
            setItem(res.data);
        })
        .catch(function (err) {
            console.log(err.message);
        });
    }
    useEffect(() => {
        if (itemId !== undefined)
            getItem();
    }, []);

    const handleSave = async event => {
        event.preventDefault();
        console.log("SAVING ITEM => " + JSON.stringify(item));
        await axios.put(`https://localhost:7074/api/items/${item.itemId}`, item)
        .then(res => {
            console.log(res);
            navigate("/salerno/items");
        })
        .catch(err => {
            console.log(err);
        });
    }
    const handleSaveButtonClick = () => {
        console.log("saving item...");
    }
    const handleInputChange = event => {
        // TODO: Validate input number vs string.
        event.preventDefault();
        const value = event.target.value;
        const attributeType = event.target.attributes.attributeType.value;
        let tempItem = Object.assign({}, item);
        tempItem[attributeType] = value;
        setItem(tempItem);
    }
    console.log(item)

    return (
        <div className='EditItem'>
            <div className='PageLayout_Header'>
                <div className='PageLayout_Header_Title'>Edit Item</div>
                <div className='PageLayout_Header_Button_Container'>
                    <FilterButton />
                </div>
            </div>
            <DeleteItemModal setDialogOpen={setDialogOpen} itemId={itemId} dialogOpen={dialogOpen} />
            <div className='EditItem_Container'>
                <ButtonTabs itemId={itemId} />
                <div className='EditItem_Grid'>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Item Details</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div>
                                <label htmlFor='name-input'>Name<div className='EditItem_Required_Field_Indicator'></div></label>
                                <input className='EditItem_Input' type='text' value={item['name']} attributeType="name" onChange={handleInputChange} id='name-input'/>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                <label htmlFor='Register_Status_Open'>Register Status <QuestionIcon style={{verticalAlign: "middle", position: "relative", top: "-5px"}}/></label>
                                <div className='EditItem_ActiveRegister_Wrapper'>
                                    <input className='EditItem_Register_Checkbox' type='checkbox' id='Register_Status_Open'/>
                                    <label htmlFor='Register_Status_Open' className='EditItem_Register_Checkbox_Label'>Active</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='department-input'>Department <QuestionIcon /></label>
                                <select className='EditItem_Input' value={item["department"]} attributeType="department" onChange={handleInputChange}  id='department-input'>
                                    <option value={item.department}>{item['department']}</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div>
                                <div style={{textAlign: 'left'}}>SKU <QuestionIcon /></div>
                                <div style={{textAlign: 'left', fontSize: '14px', fontWeight: '300', height: '39px', padding: '6px 0'}}>{item['sku']}</div>
                            </div>
                            <div>
                                <label htmlFor='category-input'>Category <QuestionIcon /></label>
                                <select className='EditItem_Input' value={item.categoryId} attributeType="category" onChange={handleInputChange} id='category-input'>
                                    <option value={item.category}>{item.category}</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='upc-input'>UPC <QuestionIcon /></label>
                                <input type='text' className='EditItem_Input' value={item['upc']} attributeType="upc" onChange={handleInputChange} id='upc-input'/>
                            </div>
                            <div className="edit-content-description">
                                <label htmlFor='description-input'>Description</label>
                                <textarea id="description-input" value={item.description} attributeType="description" onChange={handleInputChange} placeholder="Describe the item for customers..."/>
                            </div>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Pricing</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div>
                                <label htmlFor='sale-price-input'>Sales Price <div className='EditItem_Required_Field_Indicator'></div></label>
                                <input type='text' className='EditItem_Input' value={item['price']} attributeType="price" onChange={handleInputChange} id='sale-price-input'/>
                            </div>
                            <div>
                                <label htmlFor='price-type-input'>Price Type</label>
                                <select className='EditItem_Input' defaultValue="fixed" id='price-type-input'>
                                    <option value='fixed'>Fixed</option>
                                    <option value='at-the-register'>At the Register</option>
                                    <option value='unit-price'>Unit Price (lb, oz, etc.)</option>
                                </select>
                                <div className='EditItem_PriceType_Explanation'>
                                    <b>Fixed</b> prices are set from this screen and can't be 
                                    changed at the Register, only adjusted through discounts.
                                </div>
                            </div>
                            <div>
                                <label htmlFor='discounts-input'>Discounts <QuestionIcon /></label>
                                <select className='EditItem_Input' value={true} attributeType="discountable" onChange={handleInputChange} id='discounts-input'>
                                    <option value={true}>Discountable</option>
                                    <option value={false}>Non-discountable</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='cost-per-item-input'>Cost per Item <QuestionIcon /></label>
                                <div className='EditItem_Cost_Container'>
                                    <span>{item["cost"].toFixed(2)}</span>
                                    <span style={{lineHeight: '21px'}}>
                                        <button type='button' className='EditItem_Override_Cost_Button'>Override</button>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='taxable-input'>Taxable</label>
                                <select className='EditItem_Input' attributeType="taxable" onChange={handleInputChange} id='taxable-input'>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='select-tax-input'>Select Tax <QuestionIcon /></label>
                                <select className='EditItem_Input' attributeType="taskGroupRate" onChange={handleInputChange} id='select-tax-input'>
                                    <option value='test'>Add Dynamic Options</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header EditItem_Track_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Track Quantity on Hand</h3>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header edit-dark-border'>
                            <h3 className='EditItem_Item_Details_Header'>Advanced</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div>
                                <label htmlFor='supplier-input'>Supplier <QuestionIcon /></label>
                                <select className='EditItem_Input' value={item["supplier"]} attributeType="supplier" onChange={handleInputChange} id='supplier-input'>
                                    <option value={item["supplier"]}>{item['supplier']}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='supplier-item-id-input'>Supplier's Item ID <QuestionIcon /></label>
                                <input type='text' className='EditItem_Input' id='supplier-item-id-input'/>
                            </div>
                            <div>
                                <label htmlFor='ticket-printer-group-input'>Ticket Printer Group <QuestionIcon /></label>
                                <select className='EditItem_Input' id='ticket-printer-group-input'>
                                    <option value='none'>None</option>    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='EditItem_Submit_Footer'>
                    <div className='EditItem_Submit_Footer_Container'>
                            <button type='button' className='EditItem_Submit_Footer_Button_Delete' onClick={() => setDialogOpen(true)}>
                                Delete
                            </button>
                            <div style={{flexGrow: '1'}}></div>
                            <button onClick={() => navigate("/salerno/items")} className='EditItem_Submit_Footer_Button_Cancel'>
                                Cancel
                            </button>
                            <button onClick={handleSave} className='EditItem_Submit_Footer_Button_Save'>
                                Save and close
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}