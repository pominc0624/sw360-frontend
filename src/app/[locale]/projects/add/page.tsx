// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client"

import { Col, Row, ListGroup, Tab, Button } from 'react-bootstrap'
import Summary from "@/components/ProjectAddSummary/Summary"
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { useRouter } from 'next/navigation'
import HttpStatus from '@/object-types/enums/HttpStatus'
import { ToastContainer, TypeOptions, toast } from 'react-toastify'
import ApiUtils from '@/utils/api/api.util'
import ProjectPayload from "@/object-types/CreateProjectPayload"
import { useState } from 'react'
import { AUTH_TOKEN } from '@/utils/env'
import Vendor from '@/object-types/Vendor'


export default function AddProjects() {

    const router = useRouter();
    const t = useTranslations(COMMON_NAMESPACE)
    const [vendor, setVendor] = useState<Vendor> ({
        id: '',
        fullName: ''
    })
    const [externalUrls, setExternalUrls] = useState<Input[]>([{
        key: '',
        value:''
    }])
    const [externalIds, setExternalIds] = useState<Input[]>([{
        key: '',
        value:''
    }])
    const [additionalData, setAdditionalData] = useState<Input[]>([{
        key: '',
        value:''
    }])
    const [projectPayload, setProjectPayload] = useState<ProjectPayload>({
        name: '',
        description: '',
        version: '',
        visibility: 'EVERYONE',
        projectType: 'PRODUCT',
        tag: '',
        domain: '',
        leadArchitect: '',
        defaultVendorId: '',
        externalUrls: null,
        externalIds: null,
        additionalData: null,
        state: 'ACTIVE',
        phaseOutSince: '',
        moderators: null,
        contributors: null
    });

    const alert = (text: string, type: TypeOptions) =>
        toast(text, {
            type,
            position: toast.POSITION.TOP_LEFT,
            theme: 'colored',
        })

    const setExternalUrlsData = (externalUrls: Map<string, string>) => {
        const obj = Object.fromEntries(externalUrls)
        setProjectPayload({
            ...projectPayload,
            externalUrls: obj,
        })
    }

    const setExternalIdsData = (externalIds: Map<string, string>) => {
        const obj = Object.fromEntries(externalIds)
        setProjectPayload({
            ...projectPayload,
            externalIds: obj,
        })
    }
    const setAdditionalDataObject = (additionalData: Map<string, string>) => {
        const obj = Object.fromEntries(additionalData)
        setProjectPayload({
            ...projectPayload,
            additionalData: obj,
        })
    }


    const createProject = async () => {
        const response = await ApiUtils.POST('projects',
                                              projectPayload,
                                              AUTH_TOKEN)

        if (response.status == HttpStatus.CREATED) {
            const responseData = await response.json()
            alert(t('Your project is created'), 'success')
            router.push('/projects')
        } else {
            alert(t('There are some errors while creating project'), 'error')
        }
    }

    const handleCancelClick = () => {

        router.push('/projects')
    }

    return (
        <>
        <form
                action=''
                id='form_submit'
                method='post'
                onSubmit={(event) => {
                    event.preventDefault()
                    createProject()
                }}
            >
            <ToastContainer className='foo' style={{ width: '300px', height: '100px' }} />
            <div className="ms-5 mt-2">
                <Tab.Container defaultActiveKey="summary">
                    <Row>
                        <Col sm="auto" className="me-3">
                            <ListGroup>
                                <ListGroup.Item action eventKey="summary">
                                    <div className="my-2">{t('Summary')}</div>
                                </ListGroup.Item>
                                <ListGroup.Item action eventKey="administration">
                                    <div className="my-2">{t('Administration')}</div>
                                </ListGroup.Item>
                                <ListGroup.Item action eventKey="linkedProjects">
                                    <div className="my-2">{t('Linked Releases and Projects')}</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col className="me-3">
                            <Row className="d-flex justify-content-between">
                                <Col lg={3}>
                                    <Row>
                                        <Button variant="primary"
                                                type='submit'
                                                className="me-2 col-auto"
                                                >
                                                    {t('Create Project')}
                                        </Button>
                                        <Button variant="secondary"
                                                className="col-auto"
                                                onClick={handleCancelClick}
                                                >
                                                    {t('Cancel')}
                                        </Button>
                                    </Row>
                                </Col>
                                <Col lg={4} className="text-truncate buttonheader-title">
                                    {t("New Project")}
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Tab.Content>
                                    <Tab.Pane eventKey="summary">
                                        <Summary token={AUTH_TOKEN}
                                                 vendor={vendor}
                                                 setVendor={setVendor}
                                                 externalUrls={externalUrls}
                                                 setExternalUrls={setExternalUrls}
                                                 setExternalUrlsData={setExternalUrlsData}
                                                 externalIds={externalIds}
                                                 setExternalIds={setExternalIds}
                                                 setExternalIdsData={setExternalIdsData}
                                                 additionalData={additionalData}
                                                 setAdditionalData={setAdditionalData}
                                                 setAdditionalDataObject={setAdditionalDataObject}
                                                 projectPayload={projectPayload}
                                                 setProjectPayload={setProjectPayload}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="administration">
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="linkedProjects"></Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
            </form>
        </>
    )
}
