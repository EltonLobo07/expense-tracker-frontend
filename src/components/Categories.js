import React, { useEffect, useState } from "react";
import Category from "./CategoryComponent";
import CategoryService from "../services/category";

function Categories() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        CategoryService.getAllCategories()
                       .then(categories => setCategories(categories))
                       .catch(err => console.log(err.message));
    }, []);

    if (categories === null) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className = "border border-blue-300 p-12 flex flex-col gap-y-8">
            <div className = "border border-black flex items-center justify-around">
                <div className = "text-5xl font-semibold border border-yellow-300 pb-2">
                    Budgets
                </div>

                <button className = "btn btn-v2 h-fit">
                    Add Budget
                </button>
            </div>

            <div className = "border border-green-300 flex items-center flex-col gap-y-4 py-4">
                {
                    categories.map(category => <Category key = {category._id} category = {category} />)
                }
            </div>
        </div>
    );
};

export default Categories;
