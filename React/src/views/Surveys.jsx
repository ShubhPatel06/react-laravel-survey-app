import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";

export default function Surveys() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const onDeleteClick = () => {
        console.log("On Delete Click");
    };

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    const getSurveys = (url) => {
        url = url || "/survey";
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        getSurveys();
    }, []);

    return (
        <PageComponent
            title="Surveys"
            buttons={
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Create New
                </TButton>
            }
        >
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
                <div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey) => (
                            <SurveyListItem
                                survey={survey}
                                key={survey.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    <PaginationLinks meta={meta} onPageClick={onPageClick} />
                </div>
            )}
        </PageComponent>
    );
}
