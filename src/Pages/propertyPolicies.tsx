import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPolicies } from "../Store/property/actions"
import {getPropertiesPolicies} from "../Store/property/selectors";
import { PageHeader } from "../Components/common/pageHeader";
import { JSX } from "react/jsx-runtime";
import { Modal, Button, Form, Input } from 'antd'
import styled from "styled-components";

// @todo - THIS means the same property is always shown, should be diff id, ideally passed from parent
const propertyId = "1YK15JGO";

export const PropertyPolicies = () => {
    const dispatch = useDispatch()
    const policies = useSelector(getPropertiesPolicies)
    const policy = policies[0]

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [policyTypeBeingEdited, setPolicyTypeBeingEdited] = useState<string>();
    const [policyBeingEdited, setPolicyBeingEdited] = useState<PolicyObject>();

    const PageContent = styled.div`
      width: 80%;
      margin: auto
    `;

    const SectionTitle = styled.h2`
      margin: 30px 0 10px 30px
    `;

    const PolicyContainer = styled.div`
      width: 100%;
      border: 1px solid #229091;
      border-radius: 30px;
      padding: 15px 30px;
      margin: 10px 0;
      justify-content: space-between
    `;

    const PolicyContent = styled.div`
        width: 90%
    `;

    const PolicyName = styled.p`
      margin: 0 10px
    `;

    const DescriptionTitle = styled.span`
        font-weight: bold;
    `;

    const onEditClick = (policyType: string, policy: PolicyObject) => {
        setIsEditModalOpen(true)
        setPolicyTypeBeingEdited(policyType)
        setPolicyBeingEdited(policy)
    }

    const handleEditModalOk = (element: any) => {
        setIsEditModalOpen(false)
    }
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false)
    }

    const handleEditModalFinish = (element: any) => {
        setIsEditModalOpen(false)
        // @todo - set changed values to Saga Store
    }

    const createContentFromPolicies = (content: any[], policyType: string) => {
        const policyContent: JSX.Element[] = []
        content.forEach((el: any) =>
            policyContent.push(
                <PolicyContainer className={"flex"} >
                    <PolicyContent>
                        <div className={"flex"}>
                            <h3>{el.name}</h3>
                            <PolicyName className={"alignSelfCenter"}>ID: {el.id}</PolicyName>
                            {policyType === "cancellationPolicies" &&
                                <div className={"flex"}>
                                    <h3>Ref:</h3>
                                    <p className={"alignSelfCenter"}>{el.reference}</p>
                                    {(el.days === 0 && el.hours === 0) ?
                                        <p className={"alignSelfCenter"}> <u>Applicable immediately</u></p>
                                        :
                                        <p className={"alignSelfCenter"}>&rarr; {el.days} day(s) {el.hours}h</p>
                                    }
                                </div>
                            }
                        </div>
                        <p><DescriptionTitle>Description: </DescriptionTitle>{el.description}</p>
                        <p>Charge: {el.amount} {el.chargeType === "percentage" ? "%" : el.chargeType}</p>
                    </PolicyContent>
                    <div>
                        <button onClick={() => onEditClick(policyType, el)}>Edit</button>
                    </div>
                </PolicyContainer>
            )
        );
        return policyContent;
    }

    useEffect(() => {
        dispatch(getPolicies())
    }, [dispatch])

    return (
        <PageContent>
            <PageHeader title="Property Policies" id={propertyId}/>
            <div>
                <SectionTitle className={"subtitle"}>No Show Policies</SectionTitle>
                {policy.noShowPolicies && policy.noShowPolicies.length === 0 ?
                    <p>No Policies</p>
                    :
                    <>{createContentFromPolicies(policy.noShowPolicies, 'noShowPolicy')}</>
                }
                <SectionTitle>Cancellation Policies</SectionTitle>
                {policy.cancellationPolicies.length === 0 ?
                    <p>No Policies</p>
                    :
                    <>{createContentFromPolicies(policy.cancellationPolicies, 'cancellationPolicies')}</>
                }
            </div>
            <Modal
                title="Edit Policy"
                open={isEditModalOpen}
                onOk={handleEditModalOk}
                okText="Save Changes"
                onCancel={handleEditModalCancel}
            >
                <Form
                    name="editDetailsForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={(values) => handleEditModalFinish(values)}
                >
                    <Form.Item label="ID" name="id">
                        <Input placeholder={policyBeingEdited?.id || 'ID'} />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={policyBeingEdited?.name || "Name"} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder={policyBeingEdited?.description || "Description"} />
                    </Form.Item>
                    <Form.Item label="Amount" name="amount">
                        <Input defaultValue={(policyBeingEdited?.amount || -1)} />
                    </Form.Item>
                    <Form.Item label="Charge Type" name="chargeType">
                        <Input placeholder={policyBeingEdited?.chargeType || "Charge Type"} />
                    </Form.Item>
                    {policyTypeBeingEdited === "cancellationPolicies" &&
                        <>
                            <Form.Item label="Reference" name="reference">
                                <Input placeholder={policyBeingEdited?.reference || "Reference"} />
                            </Form.Item>
                            <Form.Item label="Days" name="days">
                                <Input defaultValue={policyBeingEdited?.days || -1} />
                            </Form.Item>
                            <Form.Item label="Hours" name="hours">
                                <Input defaultValue={policyBeingEdited?.hours || -1} />
                            </Form.Item>
                        </>
                    }
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </PageContent>
    )
}

interface PolicyObject {
    id: string,
    name: string,
    description: string,
    amount: number,
    chargeType: string,
    reference: string,
    days: number,
    hours: number
}
