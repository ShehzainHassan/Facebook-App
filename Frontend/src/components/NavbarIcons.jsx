import PropTypes from "prop-types";

const NavbarIcon = ({ Icon, active, position }) => {
  return (
    <>
      {position === "center" ? (
        <div className="flex items-center cursor-pointer md:px-10 sm:h-14 hover:bg-gray-100 hover:text-blue-500 rounded-xl active:border-b-2 active:border-blue-500">
          <Icon
            className={`h-5 text-center sm:h-7 mx-auto group-hover:text-blue-500 ${
              active
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          />
        </div>
      ) : (
        <Icon className="hidden xl:inline-flex p-2 h-10 w-10 bg-gray-200 text-gray-700 rounded-full cursor-pointer hover:bg-gray-300" />
      )}
    </>
  );
};

NavbarIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  active: PropTypes.any,
  position: PropTypes.string,
};

export default NavbarIcon;
