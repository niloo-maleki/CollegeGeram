import React, { memo } from "react";
import Input from "components/Input";

interface IUploadFile {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: string;
  bodyText?: string;
  className?: string;
}
const UploadFile = (props: IUploadFile) => {
  const { onChange, image, bodyText, className } = props;
  return (
    <label
      className={`flex items-center cursor-pointer ${className}`}
      htmlFor="file-upload"
    >
      <div className={`flex w-full justify-center items-center ${bodyText && 'gap-2' }`}>
        <img
          className="aspect-square object-cover rounded-full"
          src={image}
          alt="uploadPic"
        />
        {bodyText && (
          <span className="text-lightYellow font-semibold">{bodyText}</span>
        )}
      </div>
      <Input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={onChange}
        multiple={true}
      />
    </label>
  );
};

export default memo(UploadFile);
