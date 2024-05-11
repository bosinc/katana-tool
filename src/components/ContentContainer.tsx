import { Stack } from "@mui/material";
import ProductCard from "./card/ProductCard.tsx";
import { useProduct } from "@atoms/product.atom.ts";
import Loading from "@components/common/Loading.tsx";
import BlankContainer from "@components/common/BlankContainer.tsx";

const ContentContainer = () => {
  const { products, loading, loadingMessage } = useProduct();

  return (
    <Stack>
      <Stack sx={{ p: 2, gap: 2 }}>
        {loading ? (
          <Loading tip={loadingMessage} />
        ) : (
          <BlankContainer tip={"暂无商品信息，请重新选择图片"} data={products}>
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
                <ProductCard
                  key={product.product.remote_id}
                  product={product}
                />
              ))}
            </Stack>
          </BlankContainer>
        )}
      </Stack>
    </Stack>
  );
};

export default ContentContainer;
