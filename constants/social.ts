import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

export const SOCIAL_LINKS = [
  {
    name: "Twitter",
    url: "https://twitter.com/instituteofai",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/instituteofai",
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    url: "https://github.com/instituteofai",
    icon: FaGithub,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@instituteofai",
    icon: FaYoutube,
  },
  {
    name: "Discord",
    url: "https://discord.gg/instituteofai",
    icon: FaDiscord,
  },
  {
    name: "Email",
    url: "mailto:hello@instituteofai.com",
    icon: MdOutlineMail,
  },
];

export const SOCIAL_SHARE = {
  twitter: (url: string, text: string) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};
