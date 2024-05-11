import { useCallback } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useSelectProduct } from "@atoms/product.atom.ts";
import useAutoLoading from "@hooks/useAutoLoading.ts";
import { saveProductToShop } from "@services/product.ts";
import { useSelectedStore } from "@atoms/stores.atom.ts";
import { isEmpty } from "ramda";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";

const AddProductToShopCta = () => {
  const { selectedProductIds } = useSelectProduct();
  const { selectStore } = useSelectedStore();

  const { success, error } = useBaseSnackbar();

  const handleClick = useCallback(async () => {
    if (!selectStore?.id || isEmpty(selectStore?.id)) return;
    try {
      const data = await saveProductToShop({
        merchantId: selectStore.id,
        productIds: selectedProductIds,
      });

      const failCount = data.failed.length;
      const duplicateCount = data.duplicate.length;
      const successCount =
        selectedProductIds.length - data.failed.length - duplicateCount;

      if (successCount > 0) {
        success(`${successCount}个商品添加成功`);
      }
      if (duplicateCount > 0) {
        success(`${duplicateCount}个商品已存在`);
      }
      if (failCount > 0) {
        error(`${failCount}个商品添加失败`);
      }
    } catch {
      error("添加失败");
    }
  }, [selectStore?.id, selectedProductIds, success, error]);

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
