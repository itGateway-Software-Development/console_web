import { defineStore } from "pinia";
import icons from "@/assets/images/icons"
import { ref } from "vue";


export const useServiceCategoryStore = defineStore('service-category-store', () => {
    const serviceCategory = ref([
        {
            title: "Most Demand",
            image: icons.starImg,
            availableServices: [
                {
                    title: "Elastic Virtual Machine",
                    subTitle: "Deploy Windows and Linux shared VM in minute",
                    link: "/services/compute/elastic-virtual-machine"
                },
                {
                    title: "Elastic Dedicated Machine",
                    subTitle: "Virtual machine with dedicated resources in the cloud"
                },
                {
                    title: "Elastic Container Instance",
                    subTitle: "Virtual machine with dedicated resources in the cloud"
                },
                {
                    title: "Elastic RDS",
                    subTitle: "Manage relational database services for MySQL, MS SQL, PostgreSQL & Maria DB"
                },
                {
                    title: "LightSpeed DB",
                    subTitle: "Manage NoSQL Databases like MongoDB"
                },
                {
                    title: "Elastic Object Storage",
                    subTitle: "Flexible, scalable and secure object storage in the Cloud "
                },
                {
                    title: "Virtual Private Cloud",
                    subTitle: "VPC for virtual network, security and connectivity"
                },
        
            ]
        }, 
        {
            title: "Compute",   
            image: icons.computeImg,
            availableServices: [
                {
                    title: "Elastic Virtual Machine​​",
                    subTitle: "Shared Virtual Machine in the Cloud​​",
                    link: "/services/compute/elastic-virtual-machine"
                },
                {
                    title: "Dedicated Virtual Machine​​",
                    subTitle: "Virtual Machine with Dedicated Resources​​"
                },
                {
                    title: "Elastic Running Machine​​",
                    subTitle: "Managed Virtual Private Server​​"
                },
                {
                    title: "Elastic App Machine​​",
                    subTitle: "Build and Run Your Apps with Serverless​​"
                },
                {
                    title: "Code Runner​​",
                    subTitle: "Run Your Code Without Managing Server​​"
                },
                {
                    title: "Elastic Bare-Metal Server​",
                    subTitle: "Build your physical server infrastructure ​in the Cloud​​"
                },
            ]
        },
        {
            title: "Container",
            image: icons.containerImg,
            availableServices: [
                {
                    title: "Elastic Container Instance​​​",
                    subTitle: "Run the container on the cloud​"
                },
                {
                    title: "Elastic Container Hub​",
                    subTitle: "Store and manage container images​"
                },
                {
                    title: "Elastic Kubernetes Cluster​​",
                    subTitle: "Managed Kubernetes Cluster & Services​​​"
                },
                {
                    title: "FastShift​​​",
                    subTitle: "Run the container based apps in a minute​​​"
                },
            ]
        },
        {
            title: "Databases",
            image: icons.dbImg,
            availableServices: [
                {
                    title: "Elastic RDS​​​​",
                    subTitle: "Managed relational database services for​ MySQL, MS SQL, PostgreSQL & MariaDB​"
                },
                {
                    title: "Elastic Caching Services​​",
                    subTitle: "In-Memory Caching Services"
                },
                {
                    title: "One DB Migrate​​​",
                    subTitle: "Migrate your databases in real-time"
                },
                {
                    title: "LightSpeedDB​​​​",
                    subTitle: "Managed NoSQL databases like MongoDB​​​​"
                },
            ]
        },
        {
            title: "End User Computing",
            image: icons.deviceImg,
            availableServices: [
                {
                    title: "Elastic Workspace​​​",
                    subTitle: "Virtual Desktop as a Services for Windows & Linux Desktop users​​​"
                },
                {
                    title: "Elastic NAS Server​​​​​​​​",
                    subTitle: "Cloud based NAS storage to share and manage file access​"
                },
                {
                    title: "Elastic Virtual Office​​",
                    subTitle: "Digital workspace platform like Microsoft 365​​"
                },
            ]
        },
        {
            title: "Cloud Migration",
            image: icons.migrateImg,
            availableServices: [
                {
                    title: "Workspace Migration Services​​​​​",
                    subTitle: "Easily migrate your digital workspace​​"
                },
                {
                    title: "Server Migration Services​​​",
                    subTitle: "Migrate your server in real-time to the cloud​​​"
                },
                {
                    title: "Platform Migration Services​​​​",
                    subTitle: "Migrate your applications to the cloud​​​​​"
                },
                {
                    title: "Data Migration Services​",
                    subTitle: "Migrate your data to the cloud faster​ And securely​"
                },
                {
                    title: "Bare-Metal Migration Services​​",
                    subTitle: "Migrate and build your Datacenter or Server Infrastructure as Bare-Metal Cloud​"
                },
            ]
        },
        {
            title: "Networking",
            image: icons.networkImg,
            availableServices: [
                {
                    title: "Virtual Private Cloud​​",
                    subTitle: "VPC for virtual network, security and ​connectivity​​"
                },
                {
                    title: "Elastic VPN​​​​",
                    subTitle: "Secure your connection, resources and apps​​"
                },
                {
                    title: "Elastic CDN​​​​​",
                    subTitle: "Content Delivery Networking for Global Access​"
                },
                {
                    title: "Host 53​​",
                    subTitle: "Register and manage your domain​​"
                },
                {
                    title: "TrafficManager​​",
                    subTitle: "Load balancing your apps or resources ​ the cloud​"
                },
            ]
        },
        {
            title: "Security & IAM",
            image: icons.shieldImg,
            availableServices: [
                {
                    title: "Firewall Manager​​​​",
                    subTitle: "Manage and apply rules for cloud security​​​"
                },
                {
                    title: "Web Application Firewall​​​​​​",
                    subTitle: "Secure your web traffic with cloud WAF"
                },
                {
                    title: "Identity & Access Management​​",
                    subTitle: "Manage and access cloud resources securely"
                },
                {
                    title: "Certificate Manager​​​​",
                    subTitle: "Generate and attach SSL/TLS certificates​​"
                },
                {
                    title: "Key Management Services​",
                    subTitle: "Create and manage encryption keys for secure connections​"
                },
            ]
        },
        {
            title: "Storage",
            image: icons.dbImg,
            availableServices: [
                {
                    title: "Elastic Object Storage (EOS)",
                    subTitle: "Flexible, scalable and secure object storage ​in the Cloud​​"
                },
                {
                    title: "Elastic File Storage (EFS)",
                    subTitle: "Managed and centralized storage for compute resources​"
                },
                {
                    title: "Elastic Block Storage (EBS)​​",
                    subTitle: "Block storage volume for compute resources​​"
                },
                {
                    title: "Cloud Backup​​​",
                    subTitle: "Backup your cloud resources across multiple and AZs​"
                },
                {
                    title: "DataSync​",
                    subTitle: "Disaster Recovery as a Services for your ​workload"
                },
                {
                    title: "Hybrid Storage​",
                    subTitle: "Storage integration between your on-premises and itGateway Cloud"
                },
            ]
        },
        {
            title: "Web",
            image: icons.settingImg,
            availableServices: [
                {
                    title: "Elastic Web Instance​​",
                    subTitle: "Build and run your website or web apps​​"
                },
                {
                    title: "API Gateway​​​​​​​",
                    subTitle: "Publich API gateway securely and scalability​​"
                },
                {
                    title: "Web Test​​​​​",
                    subTitle: "Testing and optimizing your apps with high-scale​"
                },
                {
                    title: "Certificate Manager​​​​​",
                    subTitle: "Generate and attach SSL/TLS certificates​"
                },
                {
                    title: "Key Management Services​​",
                    subTitle: "Create and manage encryption keys for secure connections​​"
                },
                {
                    title: "Web Application Firewall​​",
                    subTitle: "Secure your web traffic with cloud WAF"
                },
                {
                    title: "Host 53​​​",
                    subTitle: "Register and manage your domain​​​"
                },
                {
                    title: "Elastic CDN​​​",
                    subTitle: "Content Delivery Networking for Global Access​"
                },
            ]
        },
        {
            title: "Business App",
            image: icons.globalImg,
            availableServices: [
                
            ]
        }
    ])

    return {
        serviceCategory}
})