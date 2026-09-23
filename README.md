# 🥩 MeatFlow Ireland — Industrial CRM & Traceability Suite

[![Architecture](https://img.shields.io/badge/Architecture-Event--Driven_SPA-blue.svg?style=for-the-badge)](#)
[![Domain](https://img.shields.io/badge/Domain-Irish_Food_Processing-emerald.svg?style=for-the-badge)](#)
[![Compliance](https://img.shields.io/badge/DAFM-IE_621_EC_Verified-orange.svg?style=for-the-badge)](#)
[![Standard](https://img.shields.io/badge/GS1-GS1--128_%2F_SSCC-purple.svg?style=for-the-badge)](#)

> An enterprise-grade, domain-driven CRM & ERP workflow engine specifically architected for the **Irish meat and food processing industry**. Designed to bridge commercial contract negotiations, DAFM veterinary regulatory compliance, factory-floor scale weighing, and EU beef traceability into a seamless **Lead-to-Cash** lifecycle.

---

## 📸 System Showcase

| Full Operational Dashboard & RBAC | GS1-128 Pallet Label & DAFM Health Mark |
| :---: | :---: |
| ![Dashboard Screenshot](assets/dashboard_preview.png) | ![GS1 Pallet Label](assets/pallet_label_preview.png) |

---

## 🌟 Key Functional Capabilities

### 1. 🔄 6-Entity Relational Data Mesh
* **Reactive Event-Bus Architecture**: Complete relational integrity across `Companies`, `Contacts`, `Deals`, `Orders`, `Tasks`, and `Tickets`.
* **Lead-to-Cash Automation**: Winning a commercial beef deal immediately auto-generates dispatch picking orders, updates live AR exposures, triggers logistics tasks, and reconciles payments upon dock delivery.

### 2. 🏛️ Irish Regulatory & Food Safety Compliance
* **DAFM Establishment Code Validation**: Integrated real-time regex & checksum verification for Irish Department of Agriculture, Food and the Marine approved meat plants (e.g., `IE 621 EC`).
* **EU Beef Traceability (EC No 1760/2000)**: Mandatory tracking across all stages: *Born in*, *Reared in*, *Slaughtered in*, and *Cut/Deboned in Ireland*.
* **Bord Bia MPQAS Standards**: Built-in adherence to the Meat Processor Quality Assurance Scheme.

### 3. ⚖️ Factory-Floor Catch-Weight & Logistics Labeling
* **Variable-Weight Tolerance Engine**: Dynamic catch-weight validation for non-standard primals, flagging real-time variance against target carcass orders within a strict $\pm 3\%$ commercial tolerance.
* **Dual GS1-128 / SSCC Logistics Generator**: Automated vector rendering of standard $100\text{ mm} \times 150\text{ mm}$ physical shipping labels featuring:
  * Application Identifiers: `AI (01)` GTIN-14, `AI (3102)` Net Weight, `AI (10)` Batch Lot.
  * Serial Shipping Container Code: `AI (00)` SSCC pallet serial identifier.
  * Clean `@media print` CSS targeting direct Zebra thermal label printing.

### 4. 🤖 AI Replenishment Prediction & Data Lineage
* **Smart Replenishment Engine**: Heuristic modeling analyzing retail purchasing cadences (e.g., Dunnes Stores, Musgrave) and chilled meat shelf-life decay, calculating order probability scores (0–100%) and auto-drafting forward production deals.
* **Full Data Lineage Pipeline**: Interactive topology tracking primal cuts from live cattle slaughter batches down through deboning, cold-storage allocations, delivery dockets (e-POD), and Net 30 invoicing.

### 5. 👥 Dual Role-Based Operational Views (RBAC)
* **Plant QA Auditor**: Focuses on veterinary health marks, HACCP audit trails, and sanitizer verification, masking commercial financial metrics.
* **Finance Controller**: Full visibility over Accounts Receivable (A/R) ledgers, credit exposure alerts, and credit-hold override workflows.

---

## 🔄 The Industrial Lead-to-Cash Pipeline

```mermaid
graph TD
    A[DAFM Plant Registration & Validation] --> B[Angus Deal Negotiation]
    B -->|Deal Won| C[Auto-Generate Picking & Dispatch Order]
    C --> D[Floor Scale Weighing & Tolerance Check]
    D --> E[GS1-128 / SSCC Pallet Label Print]
    E --> F[Early Morning CDC Logistics Handover]
    F --> G[Net 30 Invoice & AR Balance Settlement]
    D -.->|Anomaly Detected| H[QA Audit Ticket & Line Hold]

<img width="1920" height="1080" alt="output" src="https://github.com/user-attachments/assets/8a6e69b9-64f9-42b1-a310-2661f458e9cc" />
