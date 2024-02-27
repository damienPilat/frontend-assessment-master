// @todo - Would recomend changing filename to 'propertyDetails' for easier differentiation b/w it and 'propertiesPage'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../Store/property/actions";
import { getPropertiesSelector } from "../Store/property/selectors";
import { PageHeader } from "../Components/common/pageHeader";
import styled from "styled-components";

// @todo - THIS means the same property is always shown, should be diff id, ideally passed from parent or via path
const propertyId = "1YK15JGO";

export const PropertyPage = () => {
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);
  const property = properties.filter(
    (p: { id: any }) => p["id"] === propertyId
  )[0];

  const SectionTitle = styled.h2`
    margin: 30px 0 10px 10px;
    font-weight: bold;
  `;

  const PropertyPageContainer = styled.div`
    width: 80%;
    margin: auto
  `;

  const PropertyName = styled.div`
    font-size: 24px;
    display: flex;
  `;

  const PartnershipDetails = styled.p`
    font-size: initial;
  `;

  const PropertyDetailsLocation = styled.div`
    color: darkgrey;
  `;

  const PropertyImage = styled.img`
    width: 25vw;
    max-width: 400px
  `;

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <PropertyPageContainer>
      <PageHeader title="Property Details" id={propertyId} />
        <div className={"flex justifyContentSpaceBetween"}>
          <div>
            <div>
              <PropertyName><span>{property.name || "Name missing"}</span></PropertyName>
              <PropertyDetailsLocation>
                <span>{property.city || "No city provided"}, </span>
                <span>{property.country || "No country provided"}</span>
              </PropertyDetailsLocation>
              <div><a href={property.domain}>{property.domain || "No website/domain provided"}</a></div>
              <PartnershipDetails>{property.isAvailableForPartnerships ? 'YES' : 'NO'} : partnership available</PartnershipDetails>
            </div>
            <div>
              <SectionTitle>Description</SectionTitle>
              <span>{property.description || "No description available"}</span>
            </div>
          </div>
          <div>
            <PropertyImage src={property.images[0].url} alt=""  />
          </div>
        </div>
        <div>
          <div>
            <SectionTitle>Details</SectionTitle>
            <div style={{display: "flex"}}>
              <div>
                <span>Rooms</span><br />
                <span>Check-in</span><br />
                <span>Check-out</span><br />
                <span>Currency</span>
              </div>
              <div>
                <span>{property.rooms || "No value provided"}</span><br />
                <span>{property.checkInTime || "No time provided"} (timezone: {property.timezone || "N/A"})</span><br />
                <span>{property.checkOutTime || "No time provided"} (timezone: {property.timezone || "N/A"})</span><br />
                <span>{property.currency || "No currency provided"}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <SectionTitle>Contact Details</SectionTitle>
              <span>{property.phoneNumber || "No phone number provided"}</span><br />
              <a href={property.email}>{property.email || "No email provided"}</a>
            </div>
            <div>
              <SectionTitle>Location</SectionTitle>
              {!property.addressLine1 ?
                <span>No address provided</span>
                :
                <div>
                  <span>{property.addressLine1}</span><br />
                  <span>{property.postcode}</span><br />
                  <span>{property.city}</span><br />
                  <span>{property.country}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </PropertyPageContainer>
  );
};
