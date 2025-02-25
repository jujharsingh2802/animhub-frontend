import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

function GetImagePreview({
    name,
    control,
    label,
    defaultValue = "",
    className,
    cameraIcon = false,
    cameraSize = 20,
    image,
}) {
    const [preview, setPreview] = useState(image);
    const handlePreview = (e, onChange) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setPreview(URL.createObjectURL(files[0])); 
            onChange(files);
            return files;
        }
    };
    
    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="cursor-pointer relative flex flex-col justify-center items-start"
            >
                {label && (
                    <span className="inline-block mb-2 pl-1">
                        {label}
                    </span>
                )}
                <img
                    src={preview || image}
                    alt={name}
                    className={className}
                />
                {cameraIcon && (
                    <FaCamera
                        size={cameraSize}
                        className="hover:text-blue-50 text-white absolute inline-flex justify-center items-center w-full"
                    />
                )}
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue || ""}
                    render={({ field: { onChange } }) => (
                        <input
                            id={name}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePreview(e, onChange)}
                        />
                    )}
                    rules={{ required: `${name} is required` }}
                />
            </label>
        </div>
    );
}

export default GetImagePreview;