import React, { useState, useEffect, useLayoutEffect } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import namkeen from "../../images/namkeen.png"
import classes from "./AdminEmployee.module.css";
import { MENU } from "./menu";
import Rating from "./rating"
import drinks from "../../images/drink.png"
import Slider from "./slider";
import chif1 from "../../images/chif2.png"
import { FaMapMarkerAlt } from 'react-icons/fa';
import { WRAPPER } from "./warpper"
import food1 from "../../images/food-1.jpg";
import food2 from "../../images/food-2.jpg"
import food3 from "../../images/food-3.jpg"
import food4 from "../../images/food-4.jpg";
import food5 from "../../images/food-5.jpg"
import food6 from "../../images/food-6.jpg"
import getCurrentWeekDay from "./getCurrentWeekDay";

function useWindowSize() {

  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}


const EmployeeHome = (props) => {
  const [width] = useWindowSize();

  const [accountWalletText, setAccountWalletText] = useState(null);
  const [changePreview, setChangePreview] = useState(
    JSON.parse(localStorage.getItem("CHANGE_PREV"))
      ? JSON.parse(localStorage.getItem("CHANGE_PREV"))
      : false
  );
  const [feature, setFeature] = useState(
    JSON.parse(localStorage.getItem("FEATURE"))
      ? JSON.parse(localStorage.getItem("FEATURE"))
      : null
  );
  const [employeeList, setEmployeeList] = useState(
    JSON.parse(localStorage.getItem("EMPLOYEES"))
      ? JSON.parse(localStorage.getItem("EMPLOYEES"))
      : []
  );


  // Registeration Form States
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [doe, setDOE] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDOB] = useState(null);
  const [gender, setGender] = useState("Male");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [menu, setMenu] = useState([]);
  const [Wrapper, setWrap] = useState([]);
  const [currentPage, setCurrentPage] = useState('first');

  const currentWeekDay = getCurrentWeekDay(new Date().getDay());
  const [specialMenu, setSpecialMenu] = useState([]);

  const [filterEmployeeList, setFilterEmployeeList] = useState(employeeList);


  useEffect(() => {
    setFilterEmployeeList(employeeList);
  }, [employeeList]);

  useEffect(() => {
    const specialItems = Math.floor(Math.random() * MENU.length);
    setSpecialMenu(MENU[specialItems]);
    setMenu(MENU);
  }, [menu]);

  useEffect(() => {
    const specialItems = Math.floor(Math.random() * MENU.length);
    setSpecialMenu(MENU[specialItems]);
    setMenu(MENU);
  }, [menu]);

  useEffect(() => {
    setAccountWalletText(
      width < 1401 ? "Account Wallet" : "Fund Account Wallet"
    );
  }, [width]);

  const loggedInAdmin = JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
    ?.AdminEmail;
  const adminName = loggedInAdmin.split("@")[0];

  const onAdminLogout = () => {
    props.didLoginHappen(false);
    props.setLoggedInProfile(null);
    localStorage.clear();
  };



  const traverseDaySpecialItems = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("DAY_ITEMS");
    localStorage.setItem("FEATURE", JSON.stringify("DAY_ITEMS"));
  };

  const traverseFullMenu = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("MENU");
    localStorage.setItem("FEATURE", JSON.stringify("MENU"));
  };

  const menuColSize = `${feature !== "MENU" ? "col-lg-8" : "col-lg-12"}`;

  const creditFunds = (empId) => {
    console.log(employeeList);
    const empIndex = employeeList.findIndex((emp) => emp.id === empId);
    employeeList[empIndex] = {
      ...employeeList[empIndex],
      funds: employeeList[empIndex]["funds"] + 1,
    };
    localStorage.setItem("EMPLOYEES", JSON.stringify(employeeList));
    setEmployeeList(JSON.parse(localStorage.getItem("EMPLOYEES")));
  };

  const decrementFunds = (empId) => {
    console.log(employeeList);
    const empIndex = employeeList.findIndex((emp) => emp.id === empId);
    if (employeeList[empIndex].funds === 0) return;
    employeeList[empIndex] = {
      ...employeeList[empIndex],
      funds: employeeList[empIndex]["funds"] - 1,
    };
    localStorage.setItem("EMPLOYEES", JSON.stringify(employeeList));
    setEmployeeList(JSON.parse(localStorage.getItem("EMPLOYEES")));
  };

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div>
          <Button
            label={"Logout " + adminName.toUpperCase()}
            onClick={onAdminLogout}
            btnClass="btn-outline-danger"
          />
        </div>
      </div>
      <div className="container mt-3 text-center">
        <Card
          title={props.loggedInProfile + " (" + loggedInAdmin + ")"}
          background="#293462"
          textColor="#ffffff"
        >
          <div className="row">
            {feature !== "MENU" && (
              <div className="col-lg-4 mt-5 pt-5">
                <img
                  src={chif1}
                  alt="Chef Img"
                  className={classes.portalChefImage}
                />

              </div>
            )}

            <div className={menuColSize} id={classes.portalDiv}>
              {!changePreview && (
                <div>
                  <fieldset>
                    <legend>
                      <label className="display-4">
                        <small style={{ fontFamily: "Dancing Script" }}>
                          Student Portal
                        </small>
                      </label>
                    </legend>
                    <div className="row p-3 d-flex">
                        
                      <div className="col p-2 ">
                        <Card 
                          title="SHOP LOCATION"
                          textColor="#293462"
                          background="#E8F9FD"
                        > 
                        <div  className="display-8" textColor="#201658" >PATEL GROUP INSTITUTE, MOTIDAU-MEHSANA</div> <FaMapMarkerAlt /> 

                        </Card>
                      </div>
                    </div>

                    <i><h4 textColor="#201658" style={{ fontFamily: 'revert' }}>COMING SOON <b style={{color:"red"}}>...</b></h4></i>
                    <br/>
                    <marquee >
                      <div style={{ display: "flex", height: 200, gap: 20, }}>
                        <img className="mb-5" src={food1} alt="2024new" />
                        <img className="mb-5" src={drinks} alt="2024new" />
                        <img className="mb-5" src={food2} alt="2024new" />
                        <img className="mb-5" src={namkeen} alt="2024new" />
                        <img className="mb-5" src={food3} alt="2024new" />
                        <img className="mb-5" src={food4} alt="2024new" />
                        <img className="mb-5" src={food5} alt="2024new" />
                        <img className="mb-5" src={food6} alt="2024new" />
                      </div>
                    </marquee>

                  </fieldset>
                  <fieldset>
                    <legend>
                      <label className="display-4">
                        <small style={{ fontFamily: "Dancing Script" }}>
                          Item Portal
                        </small>
                      </label>
                    </legend>
                    <div className="row p-3" >
                      <div className="col p-2">
                        <Card
                          title="Today Dinner (Items for the Day)"
                          textColor="#293462"
                          background="#F2EBE9"
                        >
                          <Button
                            color="dark"
                            label="Check"
                            onClick={traverseDaySpecialItems}
                          />

                        </Card>
                      </div>
                      <div className="col p-2">
                        <Card
                          title="UpComing dinners (Best Of Our Offerings)"
                          textColor="#293462"
                          background="#F2EBE9"
                        >
                          <Button
                            color="dark"
                            label="Check" 
                            onClick={traverseFullMenu}
                          />
                        </Card>
                      </div>
                    </div>

                    <div className="row p-3">
                      <div className="col p-2">
                        <Card
                          title="Namkeen Menu"
                          textColor="#293462"
                          background="#F2EBE9"
                        >

                          <ul style={{ listStyle: "none" }}>
                            <li><b>kurkure</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Nachos</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Waffer</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Masala</b> Sing and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>popring</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Biscuits</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Chana dal</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Sev murmura</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Ratlami sev</b> price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Aloo sev</b> price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Chana jor garam </b>price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Mix chavana</b> price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Mung dal</b> and price is<t /> <b>RS.10.00 \-</b></li>
                            <li><b>Tomato Waffer</b> price is<t /> <b>RS.10.00 \-</b></li>
                            <hr />
                            <i><marquee>Other Namkeen items Coming Soon...</marquee></i>
                          </ul>

                        </Card>
                      </div>
                      <card>
                        <Slider />
                      </card>
                      <div className="col p-2">
                        <Card
                          title="Cold drinks & Choclates.. with Discounts"
                          textColor="#293462"
                          background="#F2EBE9"
                        >

                          <ul style={{ listStyle: "none" }}>
                            <li>Mirinda Orange 2.25 L.<b>  ₹75.00 <b style={{ color: "red" }}>25% OFF.</b></b> </li>
                            <li>7Up 2.25 L..<b>  ₹66.00 <b style={{ color: "red" }}>30% OFF.</b></b> </li>
                            <li>Thums Up 250 ML.<b>  ₹75.00 <b style={{ color: "red" }}>15% OFF.</b></b> </li>
                            <li>Pepsi 750 ML.<b>  ₹75.00 <b style={{ color: "red" }}>10% OFF.</b></b> </li>
                            <li>Sting Energy Drink 750 ml<b>  ₹75.00 <b style={{ color: "red" }}>20% OFF.</b></b> </li>
                            <li>Mountain Dew 2.25 L.<b>  ₹60.00 <b style={{ color: "red" }}>15% OFF.</b></b> </li>
                          <br/>
                            <i><h5 style={{ color: "#070F2B" }}>More Cold Drinks Coming Soon...</h5></i>
                          </ul>
                          <hr />

                          <h5>
                            CHOCLATES
                          </h5>
                          <hr/>
                          <ul style={{ listStyle: "none" }}>
                            <li>Amul Dark Choclates<b>  ₹110.00 <b style={{ color: "red" }}>20% OFF.</b></b> </li>
                            <li>Cadbury Dairy Milk Silk<b>  ₹70.00 <b style={{ color: "red" }}>30% OFF.</b></b> </li>
                            <li>Cadbury 5 Star.<b>  ₹10.00 <b style={{ color: "red" }}>5% OFF.</b></b> </li>
                            <li>Amul Milk Choclate<b>  ₹20.00 <b style={{ color: "red" }}>4% OFF.</b></b> </li>
                            <li>Cadbury Dairy Milk Choclate<b>  ₹10.00 <b style={{ color: "red" }}>5% OFF.</b></b> </li>
                            <li>Kit Kat <b>  ₹20.00 <b style={{ color: "red" }}>10% OFF.</b></b> </li>
                            <br/>
                            <i><h5 style={{ color: "#070F2B" }}>More Choclates Coming Soon...</h5></i>
                          </ul>
                          
                        </Card>
                        {/* <Card>
                        <Pass/>
                        </Card> */}
                      </div>

                    </div>

                  </fieldset>
                  <hr />
                  <Rating />
                </div>

              )}
              {changePreview && (
                <div>
                  {feature === "FUND_ACC" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Fund Canteen Account
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="Fund Student Canteen A/C"
                            textColor="black"
                          >
                            <div className="row p-2">
                              {employeeList.map((employee) => {
                                return (
                                  <div className="col-4 p-4" key={employee.id}>
                                    <Card
                                      background="#90B77D"
                                      title={employee.fName}
                                      textColor="white"
                                    >
                                      <h4 className="p-2">
                                        <strong>
                                          Rs.{employee.funds.toFixed(2)}
                                        </strong>
                                      </h4>
                                      <div className="row">
                                        <div className="col-6">
                                          <Button
                                            width="100%"
                                            color="success"
                                            label="+"
                                            onClick={() => {
                                              creditFunds(employee.id);
                                            }}
                                          />
                                        </div>
                                        <div className="col-6">
                                          <Button
                                            width="100%"
                                            color="success"
                                            label="-"
                                            onClick={() => {
                                              decrementFunds(employee.id);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                );
                              })}
                              <Button
                                color="danger"
                                label="Navigate Back"
                                onClick={() => {
                                  setChangePreview(false);
                                }}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "MENU" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Upcoming special
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="The Best Dishes"
                            textColor="black"
                          >
                            <div className="row p-4">
                              {menu.map((dish) => {
                                return (
                                  <div className="col-3 p-2" key={dish.item_id}>
                                    <Card
                                      cardHeight="320px"
                                      title={dish.item_name}
                                    >

                                      <div className="text-justify">
                                        {dish.item_desc}
                                      </div>
                                      <h4 className="text-center mt-2">
                                        <strong>Rs.{dish.item_price}</strong>
                                      </h4>
                                      <img
                                        style={{ width: "150px" }}
                                        src={dish.item_image}
                                        alt={dish.item_name}
                                      />
                                    </Card>
                                  </div>
                                );
                              })}
                              <div className="mb-3"></div>
                              <Button
                                color="danger"
                                label="Navigate Back"
                                onClick={() => {
                                  setChangePreview(false);
                                }}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "DAY_ITEMS" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Today's Special
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12 pb-5">
                          <Card className="p-3"
                            title={currentWeekDay + " PICKED ITEMS"}
                            textColor="black"
                          >
                            <div className="row p-1">
                              <div
                                className="col-6 offset-3 p-2"
                                key={specialMenu.item_id}
                              >
                                <Card
                                  cardHeight="320px"
                                  title={specialMenu.item_name}
                                >
                                  <div className="text-justify">
                                    {specialMenu.item_desc}
                                  </div>
                                  <h4 className="text-center mt-2">
                                    <strong>Rs.{specialMenu.item_price}</strong>
                                  </h4>
                                  <img 
                                    style={{ width: "200px", height:150}}
                                    src={specialMenu.item_image}
                                    alt={specialMenu.item_name}
                                  />
                                </Card>
                                <div className="mb-3"></div>
                                <Button
                                  color="danger"
                                  width="100%"
                                  label="Navigate Back"
                                  onClick={() => {
                                    setChangePreview(false);
                                  }}
                                />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeHome;
