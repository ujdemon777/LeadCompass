import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useParams,useNavigate } from 'react-router-dom';
import {RollbackOutlined} from '@ant-design/icons';
import OrganizationService from "services/OrganizationService";
import ApiService from 'services/ApiService';
// import LeadService from "services/LeadService";



export const LeadProfile = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState([]);

  useEffect(() => {

    getLead(organizationId);
  }, []);

  const getLead = async (id) => {
    try {
      const response = await OrganizationService.getOrganizationById({id});
      console.log("sgv")
      console.log(response.result);

      // const formattedOrganization = response.result.map((organization) => ({
      //   name: organization.name,
      //   annual_revenue: organization.annual_revenue,
      //   growth_from_last_year: organization.growth_from_last_year,
      //   team_size: organization.team_size,
      //   office_phone: organization.official_phone,
      //   website: organization.website,
      //   city: organization.county,
      //   state: organization.state,
      // }));
      const formattedOrganization = response.result;
      console.log(formattedOrganization,"formattedOrganization");
      setOrganization(formattedOrganization);
    } catch (error) {
      message.error(`Couldn't fetch organization`);
    }

  };

  return (
    <>
      <PageHeaderAlt className="border-bottom" overlap>
        {/* <span>
         <RollbackOutlined /> Back
        </span> */}
        <Button
              onClick={() => {
                navigate("/app/organizations");
              }}
              // type="primary"
              className="ml-2"
              // small button
              size="small"
              icon={<RollbackOutlined />}
            >
              Back
        </Button>
        <div className="container-fluid">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="space-between"
            alignItems="center"
          >
            <h2 className="mb-3">
              Organization Profile
            </h2>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container-fluid">
        <Tabs
          defaultActiveKey="1"
          style={{ marginTop: 30 }}
          items={[
            {
              label: "General",
              key: "1",
              children: organization && <GeneralField lead={organization} />,
            },
          ]}
        />
      </div>
    </>
  );
};

// export default LeadProfile;
