export const Chevron = ({ orientation }: { orientation: string }) => {
  const renderComponent = (): JSX.Element => {
    let chevron = <div></div>;

    switch (orientation) {
      case "up":
        chevron = (
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 1L1 8"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
        break;
      case "down":
        chevron = (
          <svg
            className="rotate-180"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 1L1 8"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
        break;
      case "left":
        chevron = (
          <svg
            className="-rotate-90"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 1L1 8"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
        break;
      case "right":
        chevron = (
          <svg
            className="rotate-90"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 1L1 8"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
        break;
      default:
        chevron = (
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 8L8 1L1 8"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
        break;
    }

    return chevron;
  };

  return <>{renderComponent()}</>;
};
