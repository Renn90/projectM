import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "jf3w5ozh",
    dataset: "production",
    useCdn: false
})