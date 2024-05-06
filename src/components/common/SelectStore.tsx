import { useStore } from "../../atoms/stores.atom.ts";
import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { find } from "ramda";
import { StorePlatform } from "../../types.ts";
import { STORE_PREFIX } from "../../utils/common.ts";

const SelectStoreInput = () => {
  const { stores, selectStore, toSelectStore, loading } = useStore();

  const filterStores = useMemo(
    () => stores.filter((store) => store.platform === StorePlatform.PEAR),
    [stores],
  );

  const handleSelected = useCallback(
    async (e: SelectChangeEvent<string>) => {
      await toSelectStore(e.target.value);
    },
    [toSelectStore],
  );

  return (
    <Select
      size={"small"}
      displayEmpty
      value={selectStore?.id ?? ""}
      defaultValue={selectStore?.id ?? ""}
      onChange={handleSelected}
      sx={{ width: 220, border: "none" }}
      placeholder={"请选择店铺"}
      renderValue={(selectValue) => {
        const store = find((store) => store.id === selectValue, stores);
        return (
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              {selectValue ? store?.storeName : "请选择店铺"}
            </Typography>
          </Stack>
        );
      }}
    >
      <MenuItem disabled value={""} sx={{ minHeight: 36 }}>
        <Typography variant={"body2"} fontWeight={600}>
          请选择店铺
        </Typography>
      </MenuItem>
      {loading ? (
        <Stack sx={{ p: 2, justifyContent: "center", alignItems: "center" }}>
          <CircularProgress size={16} />
        </Stack>
      ) : (
        filterStores.map((item) => (
          <MenuItem key={item.id} value={item.id} sx={{ minHeight: 36 }}>
            <Typography variant={"body2"} fontWeight={600}>
              {item.storeName}
            </Typography>
          </MenuItem>
        ))
      )}
    </Select>
  );
};

const SelectStore = () => {
  const { selectStore } = useStore();

  const storePath = useMemo(
    () => `${STORE_PREFIX}/${selectStore?.id}/products`,
    [selectStore],
  );

  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Typography variant="body2" fontWeight={600}>
        店铺
      </Typography>
      <SelectStoreInput />
      <Typography
        component={"a"}
        href={storePath}
        target={"_blank"}
        variant={"body2"}
      >
        前往
      </Typography>
    </Stack>
  );
};

export default SelectStore;
