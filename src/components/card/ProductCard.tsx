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
  ProductCardRateAndOrders,
  ProductCardTitle,
  ProductStoreCTA,
} from "./CardComponents";
import { AliProduct } from "../../services/product";
import { useMemo } from "react";
import currency from "currency.js";
import { CARD_WIDTH } from "../../utils/common";
import { head } from "ramda";
import { useProduct, useProductChecked } from "../../atoms/product.atom";

const ProductCard = ({ product }: { product: AliProduct }) => {
  const isChecked = useProductChecked(product);
  const { selectProduct } = useProduct();

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
      <CardActionArea onClick={() => selectProduct(product)}>
        <ProductCardMedia src={showImage ?? ""} isChecked={isChecked} />
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

        <Stack alignItems={"flex-start"}>
          <ProductCardRateAndOrders />
          <ProductStoreCTA />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 0 }}></CardActions>
    </Card>
  );
};

export default ProductCard;
