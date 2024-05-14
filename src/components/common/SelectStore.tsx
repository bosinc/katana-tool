import { useSelectedStore, useStore } from "@atoms/stores.atom.ts";
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
import { STORE_PREFIX } from "@utils/common.ts";
import { StorePlatform } from "../../enum.ts";
import BlankContainer from "@components/common/BlankContainer.tsx";

const SelectStoreInput = () => {
  const { stores, loading } = useStore();
  const { selectStore, toSelectStore } = useSelectedStore();

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
      onChange={handleSelected}
      sx={{ width: "100%", border: "none", minWidth: 220 }}
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
            <Typography
              component={"div"}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
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
      {filterStores.map((item) => (
        <MenuItem key={item.id} value={item.id} sx={{ minHeight: 36 }}>
          <Typography variant={"body2"} fontWeight={600}>
            {item.storeName}
          </Typography>
        </MenuItem>
      ))}
      {loading ? (
        <Stack sx={{ p: 2, justifyContent: "center", alignItems: "center" }}>
          <CircularProgress size={16} />
        </Stack>
      ) : (
        <BlankContainer tip={"暂无商户信息"} data={filterStores} />
      )}
    </Select>
  );
};

const SelectStore = ({
  direction = "row",
}: {
  direction?: "row" | "column";
}) => {
  const { selectStore } = useSelectedStore();

  const storePath = useMemo(
    () => (selectStore?.id ? `${STORE_PREFIX}/${selectStore?.id}` : ""),
    [selectStore],
  );

  return (
    <Stack
      direction={direction}
      alignItems={"center"}
      gap={1}
      sx={{ width: "100%" }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{ width: direction === "row" ? "auto" : "100%" }}
      >
        <Typography variant="body2" fontWeight={600}>
          店铺
        </Typography>
        <Stack sx={{ flex: 1 }}>
          <SelectStoreInput />
        </Stack>
      </Stack>
      {selectStore?.id ? (
        <Typography
          component={"a"}
          href={storePath}
          target={"_blank"}
          variant={"body2"}
        >
          前往
        </Typography>
      ) : null}
    </Stack>
  );
};

export default SelectStore;
