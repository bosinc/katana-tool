import { useCallback } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useProduct } from "../../atoms/product.atom.ts";
import useAutoLoading from "../../hooks/useAutoLoading.ts";
import { saveProductToShop } from "../../services/product.ts";
import { useStore } from "../../atoms/stores.atom.ts";
import { isEmpty } from "ramda";

const AddProductToShopCta = () => {
  const { selectedProductIds } = useProduct();
  const { selectStore } = useStore();

  const handleClick = useCallback(async () => {
    if (!selectStore?.id || isEmpty(selectStore?.id)) return;
    await saveProductToShop({
      merchantId: selectStore.id,
      productIds: selectedProductIds,
    });
  }, [selectedProductIds, selectStore]);

  const { loading, run: saveProducts } = useAutoLoading<RecordAny>(handleClick);

  return (
    <Button
      disabled={loading || selectedProductIds.length === 0}
      variant={"contained"}
      sx={{ textTransform: "unset", width: 180, height: 36 }}
      onClick={saveProducts}
    >
      {loading ? (
        <CircularProgress size={14} />
      ) : (
        <Typography variant={"body2"} fontWeight={600}>
          添加到商品库
        </Typography>
      )}
    </Button>
  );
};

export default AddProductToShopCta;
