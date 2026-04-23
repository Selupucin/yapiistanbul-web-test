import { getContact, getSettings, listBlogs, listProjects } from "@repo/api";

export async function safeProjects() {
  try {
    return await listProjects();
  } catch {
    return [];
  }
}

export async function safeBlogs() {
  try {
    return await listBlogs();
  } catch {
    return [];
  }
}

export async function safeContact() {
  try {
    return await getContact();
  } catch {
    return {
      phone: "+90 212 000 00 00",
      email: "info@yapiistanbul.com",
      address: "Istanbul, Turkiye",
      mapLocation: "https://maps.google.com",
    };
  }
}

export async function safeSettings() {
  try {
    return await getSettings();
  } catch {
    return { siteLogo: "", siteFavicon: "" };
  }
}
