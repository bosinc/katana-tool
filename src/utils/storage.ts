export const commonSyncStorage = {
  async get(key: string): Promise<string | undefined> {
    const values = await chrome.storage.sync.get();
    return values[key];
  },
  async set(key: string, value: string | undefined): Promise<void> {
    // const values = await chrome.storage.sync.get();
    // console.log({ values, key, value }, "set storage");
    await chrome.storage.sync.set({ [key]: value });
  },
};
