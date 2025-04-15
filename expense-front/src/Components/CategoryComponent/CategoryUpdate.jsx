import React, { useState, useEffect } from "react";
import { displayCategoryById, updateCategory } from '../../Services/CategoryService';
import { useNavigate, useParams } from "react-router-dom";
import '../../LoginView.css';

const UpdateCategory = () => {
    const [category, setCategory] = useState({
        categoryId: 0,
        categoryName: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const { id } = useParams();

    const returnBack = () => {
        navigate('/admin-category-list');
    };

    useEffect(() => {
        displayCategoryById(id).then((response) => {
            setCategory(response.data);
        });
    }, [id]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!category.categoryName.trim()) {
            formErrors.categoryName = "Category Name is required!";
        }
        if (!category.description.trim()) {
            formErrors.description = "Category Description is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const categoryUpdate = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        updateCategory(category).then(() => {
            alert("Category updated successfully");
            navigate('/admin-category-list');
        });
    };

    return (
        <div className="container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}>
                <div className="card-body">
                    <h2 className="text-center"><u>Update Category</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label>Category Id: </label>
                            <input name="categoryId" className="form-control" value={category.categoryId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Category Name: </label>
                            <input placeholder="Category Name" name="categoryName" className="form-control" value={category.categoryName} onChange={onChangeHandler} />
                            {errors.categoryName && (<p style={{ color: "red", fontSize: "14px" }}>{errors.categoryName}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Category Description: </label>
                            <input placeholder="Category Description" name="description" className="form-control" value={category.description} onChange={onChangeHandler} />
                            {errors.description && (<p style={{ color: "red", fontSize: "14px" }}>{errors.description}</p>)}
                        </div>
                        <button type="submit" className="btn btn-success w-100 mt-3" onClick={categoryUpdate}>Save</button>
                        <button type="button" className="btn btn-success w-100 mt-3" onClick={returnBack}>Return</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
