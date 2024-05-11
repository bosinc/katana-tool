import { CardMedia, Checkbox, Stack, Typography } from "@mui/material";
import { Grade, Store } from "@mui/icons-material";
import { CARD_MEDIA_HEIGHT } from "@utils/common.ts";

export const ProductCardTitle = ({
  title,
  link,
}: {
  title: string;
  link?: string;
}) => {
  return (
    <Typography
      gutterBottom
      variant={"body2"}
      fontWeight={500}
      component={"a"}
      href={link}
      target="_blank"
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        color: "#0D0D14",
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      // onClick={() => handleToProductDetail(0)}
    >
      {title}
    </Typography>
  );
};

export const ProductCardRateAndOrders = () => {
  return (
    <Stack
      sx={{ width: "100%" }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography
        gutterBottom
        component={"div"}
        fontSize={12}
        fontWeight={600}
        sx={{ color: (theme) => theme.palette.warning.main }}
      >
        <Grade sx={{ fontSize: 12 }} />
        4.5
      </Typography>
      <Typography gutterBottom component={"div"} fontSize={12}>
        订单数: 48999
      </Typography>
    </Stack>
  );
};

export const ProductStoreCTA = ({ link }: { link: string }) => {
  return (
    <Stack
      component={"a"}
      direction={"row"}
      alignItems={"center"}
      gap={0.5}
      sx={{
        fontSize: 0,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      href={link}
      target="_blank"
    >
      <Store sx={{ fontSize: 14, color: "#999" }} />
      <Typography
        variant={"body2"}
        fontSize={10}
        component={"span"}
        fontWeight={600}
        sx={{
          color: "#999",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          textAlign: "left",
        }}
      >
        查看店铺
      </Typography>
    </Stack>
  );
};

export const ProductCardMedia = ({
  src,
  isChecked,
  canSelect,
}: {
  src: string;
  isChecked?: boolean;
  canSelect?: boolean;
}) => {
  return (
    <CardMedia sx={{ height: CARD_MEDIA_HEIGHT }} image={src}>
      {canSelect ? (
        <Stack
          sx={{
            p: 1,
            bgcolor: "rgba(0,0,0,.8)",
            position: "absolute",
            right: 0,
            top: 0,
            borderBottomLeftRadius: 12,
            boxShadow: "rgba(255, 255, 255, 0.1) -2px 2px 2px -1px",
          }}
        >
          <Checkbox
            sx={{
              p: 0,
              color: "white",
            }}
            color="default"
            checked={isChecked}
          />
        </Stack>
      ) : null}
    </CardMedia>
  );
};
