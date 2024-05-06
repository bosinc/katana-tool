import { Stack } from "@mui/material";
import ProductCard from "./card/ProductCard.tsx";
import { useProduct } from "../atoms/product.atom.ts";

const ContentContainer = () => {
  const { products } = useProduct();

  return (
    <Stack>
      <Stack sx={{ p: 2, gap: 2 }}>
        <Stack
          sx={{
            maxWidth: "100%",
            width: "inherit",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.product.remote_id} product={product} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContentContainer;
