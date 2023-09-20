import {Backdrop, CircularProgress} from '@mui/material';

type LoadingBackdropProps = {
  loading: boolean;
};

function LoadingBackdrop(props: LoadingBackdropProps) {
  const {loading} = props;

  return (
    <Backdrop
      sx={{
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10,
      }}
      open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingBackdrop;