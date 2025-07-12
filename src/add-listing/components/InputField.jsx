import React from 'react';
import { Input } from "@/components/ui/input";

function InputField({ item, handleInputChange, cropInfo, disabled = false }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        defaultValue={cropInfo?.[item.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        disabled={disabled}  // price uneditable for user
      />
    </div>
  );
}

export default InputField;
