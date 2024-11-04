import { ColorRing } from "react-loader-spinner";
import { Backdrop } from "@mui/material";
const Loader = () => {
  const loaderFlag = true;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderFlag}
      >
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </Backdrop>
    </>
  );
};

export default Loader;
