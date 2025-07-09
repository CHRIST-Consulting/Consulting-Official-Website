import React, { ReactElement } from "react";
import { Target, Users, FileSearch, Building2 } from "lucide-react";

export interface ClientCluster {
  id: string;
  title: string;
  icon: ReactElement;
  description: string;
  clients: string[];
}

export const clientClustersData: ClientCluster[] = [
  {
    id: "core",
    title: "Core Consultancy",
    icon: React.createElement(Target, { size: 24 }),
    description:
      "Strategic consulting, software development, and innovation partners",
    clients: [
      "/images/clients/core-consultancy/client1.jpg",
      "/images/clients/core-consultancy/client2.jpg",
      "/images/clients/core-consultancy/testpan-india.png",
      "/images/clients/core-consultancy/client4.jpg",
      "/images/clients/core-consultancy/skoolz.png",
      "/images/clients/core-consultancy/client6.jpg",
      "/images/clients/core-consultancy/client7.jpg",
    ],
  },
  {
    id: "training",
    title: "Training & Development",
    icon: React.createElement(Users, { size: 24 }),
    description:
      "Partners in leadership development and organizational learning",
    clients: [
      "https://c.ndtvimg.com/2025-01/t7f4o1kg_tvs_625x300_17_January_25.jpg?im=FaceCrop,algorithm=dnn,width=545,height=307",
      "data:image/png;base64,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",
      "https://media.licdn.com/dms/image/v2/D560BAQHxJyAxHZaGSA/company-logo_200_200/company-logo_200_200/0/1720464895560?e=2147483647&v=beta&t=7RpQdY0hP0UGXiy5vnGWAVfBb1Gr8ouJXEN9zGgc03w",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGzGc_hB5EtDwgx3wlESjIUCP5tbE_xms2w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAQ6D0-QJZJyCmBTwmEFWMvDjCBuhcbJbq1Q&s",
    ],
  },
  {
    id: "research",
    title: "Research Consultancy",
    icon: React.createElement(FileSearch, { size: 24 }),
    description: "Research partnerships and data-driven consulting engagements",
    clients: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwiG_zComoVpi_YXgjmMixJ028Y-lTdifTw&s",
      "https://media.licdn.com/dms/image/v2/C4D0BAQGgpMQjgqEjSg/company-logo_200_200/company-logo_200_200/0/1653633169164?e=2147483647&v=beta&t=d69l5qYk49hoOulVVfp1GWJxu02Igvf139XFNs1RCMI",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhYIOBKHVPAX-45vU5KYJjyOcCjlcJ_Gwyg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTKw126m7PlZDHmn3_yrLzPY1n-C7lykRNcQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0v_Jq-AvPE8R-1MFtepbjG3rttIVHVW00-g&s",
      "https://media.licdn.com/dms/image/v2/D560BAQF_ME8AjzO4ZA/company-logo_200_200/company-logo_200_200/0/1727760583753/zopnote_logo?e=2147483647&v=beta&t=EKCtf1BOCuDCYMg2zAlId8qE0PLtFjCAIxktpKQpYKI",
    ],
  },
  {
    id: "government",
    title: "Government Projects/Social Work",
    icon: React.createElement(Building2, { size: 24 }),
    description:
      "Collaborations with government bodies and NGOs for social impact and public sector transformation",
    clients: [
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Bangalore_City_Police_Logo.png",
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Bureau_of_Police_Research_and_Development_Logo.png/250px-Bureau_of_Police_Research_and_Development_Logo.png",
      "https://www.scconline.com/blog/wp-content/uploads/2020/08/MHRD-678x325-1.jpg",
      "https://static.ambitionbox.com/alpha/company/photos/logos/labournet-services.jpg",
      "https://www.logopeople.in/wp-content/uploads/2023/08/Nandini-logo.jpg",
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Indian_Council_of_Medical_Research_Logo.svg/1200px-Indian_Council_of_Medical_Research_Logo.svg.png",
    ],
  },
];
