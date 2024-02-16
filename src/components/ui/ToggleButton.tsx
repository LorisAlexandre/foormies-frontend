export const ToggleButton = ({
  state,
  children,
  handleUpdate,
  property,
}: {
  state?: boolean;
  children?: string;
  handleUpdate: Function;
  property: string;
}) => {
  const changeState = () => {
    handleUpdate(property, !state);
  };

  return (
    <div onClick={changeState} className="flex gap-2 items-center">
      <div
        className={`relative w-[40px] h-6 rounded-full flex items-center justify-center ${
          state ? "bg-primary-400" : "border border-primary-400 bg-[#DEDEDE]"
        }`}
      >
        <div
          className={`aspect-square w-[18px] bg-white rounded-full absolute ${
            state ? "right-1" : "left-1"
          }`}
        ></div>
      </div>
      <p> {children} </p>
    </div>
  );
};
