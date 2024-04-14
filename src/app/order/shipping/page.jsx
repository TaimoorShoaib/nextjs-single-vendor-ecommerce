"use client"
import React, {  useState } from "react";
import style from "./shipping.module.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../actions/cartAction"
import MetaData from "../../../components/MetaData/metaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useRouter } from 'next/navigation';
import CheckoutSteps from "../checkoutSteps/page"
//import { useAlert } from "react-alert";
//import CheckoutSteps from "../Cart/CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { shippingInfo } = useSelector((state) => state.cart);

  // Provide default values if shippingInfo is null or undefined
  const [address, setAddress] = useState(shippingInfo?.address );
  const [city, setCity] = useState(shippingInfo?.city );
  const [state, setState] = useState(shippingInfo?.state );
  const [country, setCountry] = useState(shippingInfo?.country );
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode );
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo );
  const [error, setError] = useState("");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 11) {
      setError("Phone Number should be 11 digits long");
      return;
    }
    
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    router.push("/order/confirm");
  };
  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0}/>

      <form/>

      <div className={style.shippingContainer}>
        <div className={style.shippingBox}>
          <h2 className={style.shippingHeading}>Shipping Details</h2>

          <form
            className={style.shippingForm}
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className={style.shippingBtn}
              disabled={state ? false : true}
            />
          </form>
          {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
        </div>
      </div>
    </>
  );
};

export default Shipping;