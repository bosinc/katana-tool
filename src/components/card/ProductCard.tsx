import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  ProductCardMedia,
  ProductCardTitle,
  ProductStoreCTA,
} from "./CardComponents";
import { useMemo } from "react";
import currency from "currency.js";
import { CARD_WIDTH } from "@utils/common.ts";
import { head } from "ramda";
import { useProductChecked, useSelectProduct } from "@atoms/product.atom.ts";
import { ImageSearchResponseItem } from "@katana-common/response/aliexpress.response.ts";
import { useAuth } from "@atoms/user.atom.ts";

const ProductCard = ({ product }: { product: ImageSearchResponseItem }) => {
  const isChecked = useProductChecked(product);
  const { selectProduct } = useSelectProduct();
  const { isLogin } = useAuth();

  const { showPrice, showImage } = useMemo(() => {
    let price;
    const priceArr = product.product.variants.map((variant) =>
      Number(variant.price),
    );

    const [min, max] = [Math.min(...priceArr), Math.max(...priceArr)];

    if (min === max) {
      price = currency(min).format();
    } else {
      price = `${currency(min).format()}-${currency(max).format()}`;
    }

    return { showPrice: price, showImage: head(product.product.images)?.src };
  }, [product]);

  return (
    <Card sx={{ width: CARD_WIDTH, display: "flex", flexDirection: "column" }}>
      <CardActionArea
        onClick={isLogin ? () => selectProduct(product) : () => {}}
      >
        <ProductCardMedia
          src={showImage ?? ""}
          isChecked={isChecked}
          canSelect={isLogin}
        />
      </CardActionArea>
      <CardContent
        sx={{
          p: 1.5,
          flex: 1,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          minHeight: 120,
        }}
      >
        <Stack>
          <ProductCardTitle
            title={product.product.title}
            link={product.productDetailUrl}
          />
          <Typography
            gutterBottom
            color={"error"}
            fontWeight={700}
            component={"div"}
          >
            {showPrice}
          </Typography>
        </Stack>

        <Stack alignItems={"flex-end"} justifyContent={"flex-end"}>
          <ProductStoreCTA link={product.shopUrl} />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 0 }}></CardActions>
    </Card>
  );
};

export default ProductCard;
