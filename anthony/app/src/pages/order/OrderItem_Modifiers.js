// import React from 'react';

// const Groups = () => {
//     if (item["modifier"]["groups"].length === 0) return <></>
//     else return (
//         <div className="OrderItem_Addons_Container">
//             <div className="OrderItem_Addons_Header">
//                 <span className="OrderItem_Addons_Title">Add to {item["name"]}</span>
//                 <span className="OrderItem_Options_Type">(Optional)</span>
//             </div>
//             <div className="OrderItem_Options_Max_Select_Label">Select up to 1</div>
//             <ul className="OrderItem_Options_List">
//                 {
//                     item["modifier"]["addons"].map(addon => (
//                         <li key={`addon-${addon["addonId"]}`}>
//                             <button className="OrderItem_Option_Button" onClick={() => handleOptionClick("addon", { addonId: addon["addonId"], name: addon["name"], price: addon["price"] })}>
//                                 <CheckBox value={{ addonId: addon["addonId"], name: addon["name"], price: addon["price"] }} optionType="addon" />
//                                 <span className="OrderItem_Option_Label">{addon["name"]}</span>
//                             </button>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }
// const Addons = () => {
//     console.log(item);
//     if (item["modifier"]["addons"].length === 0) return <></>
//     else return (
//         <div className="OrderItem_Addons_Container">
//             <div className="OrderItem_Addons_Header">
//                 <span className="OrderItem_Addons_Title">Add to {item["name"]}</span>
//                 <span className="OrderItem_Options_Type">(Optional)</span>
//             </div>
//             <div className="OrderItem_Options_Max_Select_Label">Select up to {item["modifier"]["addons"].length}</div>
//             <ul className="OrderItem_Options_List">
//                 {
//                     item["modifier"]["addons"].map(addon => (
//                         <li key={`addon-${addon["addonId"]}`}>
//                             <button className="OrderItem_Option_Button" onClick={() => handleOptionClick("addon", { addonId: addon["addonId"], name: addon["name"], price: addon["price"] })}>
//                                 <CheckBox value={{ addonId: addon["addonId"], name: addon["name"], price: addon["price"] }} optionType="addon" />
//                                 <span className="OrderItem_Option_Label">{addon["name"]}</span>
//                                 <span className="OrderItem_Option_Label_Price">{!isNaN(addon["price"]) ? `+$${addon["price"].toFixed(2)}` : ""}</span>
//                             </button>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }
// const NoOptions = () => {
//     if (item["modifier"]["noOptions"].length === 0) return <></>
//     else return (
//         <div className="OrderItem_Addons_Container">
//             <div className="OrderItem_Addons_Header">
//                 <span className="OrderItem_Addons_Title">Remove from {item["name"]}</span>
//                 <span className="OrderItem_Options_Type">(Optional)</span>
//             </div>
//             <span className="OrderItem_Options_Max_Select_Label">Select up to 1</span>
//             <ul className="OrderItem_Options_List">
//             {
//                 item["modifier"]["noOptions"].map(noOption => (
//                     <li key={`noOption-${noOption["noOptionId"]}`}>
//                         <button className="OrderItem_Option_Button" onClick={() => handleOptionClick("noOption", { noOptionId: noOption["noOptionId"], name: noOption["name"], discountPrice: noOption["discountPrice"] })}>
//                             <CheckBox value={{ noOptionId: noOption["noOptionId"], name: noOption["name"], discountPrice: noOption["discountPrice"] }} optionType="noOption" />
//                             <span className="OrderItem_Option_Label">{noOption["name"]}</span>
//                         </button>
//                     </li>
//                 ))
//             }
//             </ul>
//         </div>
//     )
// }