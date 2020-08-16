/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     13/06/2020 17:39:32                          */
/*==============================================================*/

/*==============================================================*/
/* Table: CITY                                                  */
/*==============================================================*/
create table CITY (
   CITY_ID              SERIAL               not null,
   CITY_DESCRIP         VARCHAR(100)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CITY primary key (CITY_ID)
);

/*==============================================================*/
/* Index: CITY_PK                                               */
/*==============================================================*/
create unique index CITY_PK on CITY (
CITY_ID
);

/*==============================================================*/
/* Table: DISTRICTS                                             */
/*==============================================================*/
create table DISTRICTS (
   DISTRICT_ID          SERIAL               not null,
   CITY_ID              INT4                 not null,
   DISTRICT_DESCRIP     VARCHAR(100)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_DISTRICTS primary key (DISTRICT_ID)
);

/*==============================================================*/
/* Index: DISTRICT_PK                                           */
/*==============================================================*/
create unique index DISTRICT_PK on DISTRICTS (
DISTRICT_ID
);

/*==============================================================*/
/* Index: CITY_FK_DISTRICT                                      */
/*==============================================================*/
create  index CITY_FK_DISTRICT on DISTRICTS (
CITY_ID
);

/*==============================================================*/
/* Table: PERSON                                                */
/*==============================================================*/
create table PERSON (
   PERSON_ID            SERIAL               not null,
   DISTRICT_ID          INT4                 null,
   NOMBRE               VARCHAR(100)         not null,
   LAST_NAME            VARCHAR(100)         not null,
   CEDULA               VARCHAR(10)          not null,
   RUC                  VARCHAR(12)          not null,
   HOME_ADDRESS         VARCHAR(255)         not null,
   BUSINESS_NAME        VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PERSON primary key (PERSON_ID)
);

/*==============================================================*/
/* Index: PERSON_PK                                             */
/*==============================================================*/
create unique index PERSON_PK on PERSON (
PERSON_ID
);

/*==============================================================*/
/* Table: PROVIDER                                              */
/*==============================================================*/
create table PROVIDER (
   PERSON_ID            INT4                 not null,
   PROV_ACTIVO          BOOL                 not null,
   OBS                  VARCHAR(255)         null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null
)INHERITS (person);

/*==============================================================*/
/* Index: PROVIDER_PK                                           */
/*==============================================================*/
create unique index PROVIDER_PK on PROVIDER (
PERSON_ID
);

/*==============================================================*/
/* Index: PERSON_ID_FK_PROVIDER                                 */
/*==============================================================*/
create  index PERSON_ID_FK_PROVIDER on PROVIDER (
PERSON_ID
);

/*==============================================================*/
/* Table: APPOINTMENTS                                          */
/*==============================================================*/
create table APPOINTMENTS (
   APPOIN_ID            SERIAL               not null,
   APPOIN_DESCRIPTION   VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_APPOINTMENTS primary key (APPOIN_ID)
);

/*==============================================================*/
/* Index: APPOINTMENT_PK                                        */
/*==============================================================*/
create unique index APPOINTMENT_PK on APPOINTMENTS (
APPOIN_ID
);

/*==============================================================*/
/* Table: AUDIT                                                 */
/*==============================================================*/
create table AUDIT (
   AUDIT_ID             SERIAL               not null,
   USER_ID              INT4                 null,
   AUDIT_TABLE          INT4                 not null,
   AUDIT_ACTION         INT4                 not null,
   constraint PK_AUDIT primary key (AUDIT_ID)
);

/*==============================================================*/
/* Index: AUDIT_PK                                              */
/*==============================================================*/
create unique index AUDIT_PK on AUDIT (
AUDIT_ID
);

/*==============================================================*/
/* Table: BRANCH                                                */
/*==============================================================*/
create table BRANCH (
   BRANCH_ID            SERIAL               not null,
   BRANCH_DESCRIP       VARCHAR(100)         not null,
   BRAND_ADDRESS        VARCHAR(255)         null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_BRANCH primary key (BRANCH_ID)
);

/*==============================================================*/
/* Index: BRANCH_PK                                             */
/*==============================================================*/
create unique index BRANCH_PK on BRANCH (
BRANCH_ID
);

/*==============================================================*/
/* Table: BRAND                                                 */
/*==============================================================*/
create table BRAND (
   BRAND_ID             SERIAL               not null,
   BRAND_DESCRIP        VARCHAR(50)          not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_BRAND primary key (BRAND_ID)
);

/*==============================================================*/
/* Index: BRAND_PK                                              */
/*==============================================================*/
create unique index BRAND_PK on BRAND (
BRAND_ID
);

/*==============================================================*/
/* Table: BUYS                                                  */
/*==============================================================*/
create table BUYS (
   BUY_ID               SERIAL               not null,
   PERSON_ID            INT4                 null,
   BUY_DATE             DATE                 not null,
   BUY_INVOICE_NUMBER   VARCHAR(50)          not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_BUYS primary key (BUY_ID)
);

/*==============================================================*/
/* Index: BUY_PK                                                */
/*==============================================================*/
create unique index BUY_PK on BUYS (
BUY_ID
);

/*==============================================================*/
/* Index: PROVIDER_ID_FK_BUY                                    */
/*==============================================================*/
create  index PROVIDER_ID_FK_BUY on BUYS (
PERSON_ID
);

/*==============================================================*/
/* Table: BUY_DETAILS                                           */
/*==============================================================*/
create table BUY_DETAILS (
   BUY_DETAILS_ID       SERIAL               not null,
   BUY_ID               INT4                 null,
   PRODUCT_ID           INT4                 null,
   BDETAILS_QTY         INT4                 not null,
   BDETAILS_PRICE       FLOAT8               not null,
   BDETAILS_DISCOUNT    INT4                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_BUY_DETAILS primary key (BUY_DETAILS_ID)
);

/*==============================================================*/
/* Index: BUY_DETAILS_PK                                        */
/*==============================================================*/
create unique index BUY_DETAILS_PK on BUY_DETAILS (
BUY_DETAILS_ID
);

/*==============================================================*/
/* Index: BUY_ID_FK_B_DETAILS                                   */
/*==============================================================*/
create  index BUY_ID_FK_B_DETAILS on BUY_DETAILS (
BUY_ID
);

/*==============================================================*/
/* Index: PRODUCT_ID_FK_B_DETAILS                               */
/*==============================================================*/
create  index PRODUCT_ID_FK_B_DETAILS on BUY_DETAILS (
PRODUCT_ID
);

/*==============================================================*/
/* Table: CATEGORY                                              */
/*==============================================================*/
create table CATEGORY (
   CAT_ID               SERIAL               not null,
   CAT_DESCRIPT         VARCHAR(100)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CATEGORY primary key (CAT_ID)
);

/*==============================================================*/
/* Index: CATEGORIA_PK                                          */
/*==============================================================*/
create unique index CATEGORIA_PK on CATEGORY (
CAT_ID
);



/*==============================================================*/
/* Table: CLIENTS                                               */
/*==============================================================*/
create table CLIENTS (
   PERSON_ID            INT4                 not null,
   WPLACE_ID            INT4                 null,
   DIREC_CLIENTE        VARCHAR(255)         not null,
   CREDIT_LIMIT         FLOAT(2)               not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null
)INHERITS (PERSON);

create unique index CLIENTS_PK on CLIENTS (
PERSON_ID
);
/*==============================================================*/
/* Index: WPLACE_FK_CLIENT                                      */
/*==============================================================*/
create  index WPLACE_FK_CLIENT on CLIENTS (
WPLACE_ID
);

/*==============================================================*/
/* Table: CONTACT_PERSON                                        */
/*==============================================================*/
create table CONTACT_PERSON (
   C_PERSON_ID          SERIAL               not null,
   PERSON_ID            INT4                 null,
   CTYPE_ID             INT4                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CONTACT_PERSON primary key (C_PERSON_ID)
);

/*==============================================================*/
/* Index: C_PERSON_FK                                           */
/*==============================================================*/
create unique index C_PERSON_FK on CONTACT_PERSON (
C_PERSON_ID
);

/*==============================================================*/
/* Index: PERSON_FK_C_PERSON                                    */
/*==============================================================*/
create  index PERSON_FK_C_PERSON on CONTACT_PERSON (
PERSON_ID
);

/*==============================================================*/
/* Index: C_TYPE_FK_C_PERSON                                    */
/*==============================================================*/
create  index C_TYPE_FK_C_PERSON on CONTACT_PERSON (
CTYPE_ID
);

/*==============================================================*/
/* Table: CONTACT_TYPE                                          */
/*==============================================================*/
create table CONTACT_TYPE (
   CTYPE_ID             SERIAL               not null,
   CTYPE_DESCRIP        VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CONTACT_TYPE primary key (CTYPE_ID)
);

/*==============================================================*/
/* Index: CONTACT_TYPE_PK                                       */
/*==============================================================*/
create unique index CONTACT_TYPE_PK on CONTACT_TYPE (
CTYPE_ID
);

/*==============================================================*/
/* Table: CREDIT                                                */
/*==============================================================*/
create table CREDIT (
   CREDIT_ID            SERIAL               not null,
   PETITIONER_ID        INT4                 null,
   SUPERVISOR_ID        INT4                 null,
   PERSON_ID            INT4                 null,
   REQUEST_DATE         DATE                 not null,
   ACCEPTANCE_DATE__    DATE                 null,
   FEE_QTY              INT4                 not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CREDIT primary key (CREDIT_ID)
);

/*==============================================================*/
/* Index: CREDIT_PK                                             */
/*==============================================================*/
create unique index CREDIT_PK on CREDIT (
CREDIT_ID
);

/*==============================================================*/
/* Index: PETITIONER_FK_CREDIT                                  */
/*==============================================================*/
create  index PETITIONER_FK_CREDIT on CREDIT (
PETITIONER_ID
);

/*==============================================================*/
/* Index: SUPERVISOR_FK_CREDIT                                  */
/*==============================================================*/
create  index SUPERVISOR_FK_CREDIT on CREDIT (
SUPERVISOR_ID
);

/*==============================================================*/
/* Index: CLIENT_FK_CREDIT                                      */
/*==============================================================*/
create  index CLIENT_FK_CREDIT on CREDIT (
PERSON_ID
);

/*==============================================================*/
/* Table: CREDIT_FEE                                            */
/*==============================================================*/
create table CREDIT_FEE (
   CRE_FEE_ID           SERIAL               not null,
   CREDIT_ID            INT4                 not null,
   FEE_NUMBER           INT4                 not null,
   FEE_AMOUNT           INT4                 not null,
   CF_DUE_DATE          DATE                 not null,
   CF_INTEREST          FLOAT8               not null,
   CF_PAY_AMOUNT        FLOAT8               not null,
   CF_STATE             VARCHAR(20)          not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_CREDIT_FEE primary key (CRE_FEE_ID)
);

/*==============================================================*/
/* Index: CREDIT_FEE_PK                                         */
/*==============================================================*/
create unique index CREDIT_FEE_PK on CREDIT_FEE (
CRE_FEE_ID
);

/*==============================================================*/
/* Index: CREDIT_FK_C_FEE                                       */
/*==============================================================*/
create  index CREDIT_FK_C_FEE on CREDIT_FEE (
CREDIT_ID
);



/*==============================================================*/
/* Table: EMPLOYEES                                             */
/*==============================================================*/
create table EMPLOYEES (
   PERSON_ID            INT4                 not null,
   APPOIN_ID            INT4                 null,
   USER_ID              INT4                 null,
   BRANCH_ID            INT4                 null,
   PERSON_STARTDATE     DATE                 null,
   PERSON_STATUS        BOOL                 null,
   PERSON_OBSERVATION   VARCHAR(255)         null,
   PERSON_SALARY        FLOAT8               null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null
)INHERITS (PERSON);

/*==============================================================*/
/* Index: EMPLOYEES_PK                                          */
/*==============================================================*/
create unique index EMPLOYEES_PK on EMPLOYEES (
PERSON_ID
);

/*==============================================================*/
/* Index: APOINTMENT_FK_EMPLOYEES                               */
/*==============================================================*/
create  index APOINTMENT_FK_EMPLOYEES on EMPLOYEES (
APPOIN_ID
);

/*==============================================================*/
/* Index: USER_FK_EMPLOYEES                                     */
/*==============================================================*/
create  index USER_FK_EMPLOYEES on EMPLOYEES (
USER_ID
);

/*==============================================================*/
/* Index: BRANCH_FK_EMPLOYEES                                   */
/*==============================================================*/
create  index BRANCH_FK_EMPLOYEES on EMPLOYEES (
BRANCH_ID
);

/*==============================================================*/
/* Table: MOVEMENT_TYPE                                         */
/*==============================================================*/
create table MOVEMENT_TYPE (
   M_TYPE_ID            SERIAL               not null,
   DESCRIPTION          VARCHAR(255)         not null,
   MOVE_TYPE            BOOL                 not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_MOVEMENT_TYPE primary key (M_TYPE_ID)
);

/*==============================================================*/
/* Index: M_TYPE_PK                                             */
/*==============================================================*/
create unique index M_TYPE_PK on MOVEMENT_TYPE (
M_TYPE_ID
);

/*==============================================================*/
/* Table: PAYMENT_METHOD                                        */
/*==============================================================*/
create table PAYMENT_METHOD (
   P_METHOD_ID          SERIAL               not null,
   PM_DESCRIP           VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PAYMENT_METHOD primary key (P_METHOD_ID)
);

/*==============================================================*/
/* Index: P_METHOD_PK                                           */
/*==============================================================*/
create unique index P_METHOD_PK on PAYMENT_METHOD (
P_METHOD_ID
);

/*==============================================================*/
/* Table: PERMITS                                               */
/*==============================================================*/
create table PERMITS (
   PERMITS_ID           SERIAL               not null,
   ROLE_ID              INT4                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PERMITS primary key (PERMITS_ID)
);

/*==============================================================*/
/* Index: PERMITS_PK                                            */
/*==============================================================*/
create unique index PERMITS_PK on PERMITS (
PERMITS_ID
);

/*==============================================================*/
/* Index: ROLE_FK_PERMITS                                       */
/*==============================================================*/
create  index ROLE_FK_PERMITS on PERMITS (
ROLE_ID
);

/*==============================================================*/
/* Table: PERMITS_X_USER                                        */
/*==============================================================*/
create table PERMITS_X_USER (
   P_USER_ID            SERIAL               not null,
   USER_ID              INT4                 null,
   PERMITS_ID           INT4                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PERMITS_X_USER primary key (P_USER_ID)
);

/*==============================================================*/
/* Index: PERMITS_USER_PK                                       */
/*==============================================================*/
create unique index PERMITS_USER_PK on PERMITS_X_USER (
P_USER_ID
);

/*==============================================================*/
/* Index: USER_FK_P_USER                                        */
/*==============================================================*/
create  index USER_FK_P_USER on PERMITS_X_USER (
USER_ID
);

/*==============================================================*/
/* Index: PERMITS_FK_P_USER                                     */
/*==============================================================*/
create  index PERMITS_FK_P_USER on PERMITS_X_USER (
PERMITS_ID
);

/*==============================================================*/
/* Index: DISTRIC_FK_PERSON                                     */
/*==============================================================*/
create  index DISTRIC_FK_PERSON on PERSON (
DISTRICT_ID
);

/*==============================================================*/
/* Table: PRODUCT                                               */
/*==============================================================*/
create table PRODUCT (
   PRODUCT_ID           SERIAL               not null,
   SUB_CAT_ID           INT4                 null,
   BRAND_ID             INT4                 null,
   PERSON_ID            INT4                 null,
   PROD_DESCRIP         VARCHAR(100)         not null,
   PROD_IVA             INT4                 not null,
   PROD_SALE_PRICE      FLOAT8               not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PRODUCT primary key (PRODUCT_ID)
);

/*==============================================================*/
/* Index: PRODUCTO_PK                                           */
/*==============================================================*/
create unique index PRODUCTO_PK on PRODUCT (
PRODUCT_ID
);

/*==============================================================*/
/* Index: SUB_CAT_PROD_FK                                       */
/*==============================================================*/
create  index SUB_CAT_PROD_FK on PRODUCT (
SUB_CAT_ID
);

/*==============================================================*/
/* Index: BRAND_PROD_FK                                         */
/*==============================================================*/
create  index BRAND_PROD_FK on PRODUCT (
BRAND_ID
);

/*==============================================================*/
/* Index: PROVIDER_PROD_FK                                      */
/*==============================================================*/
create  index PROVIDER_PROD_FK on PRODUCT (
PERSON_ID
);

/*==============================================================*/
/* Table: PROD_TRANSFERS                                        */
/*==============================================================*/
create table PROD_TRANSFERS (
   PROD_TRANSFER_ID     SERIAL               not null,
   BR_ORIGIN_ID         INT4                 not null,
   BR_DESTINATION_ID    INT4                 not null,
   TRANSFER_DATE        DATE                 not null,
   STATE                VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PROD_TRANSFERS primary key (PROD_TRANSFER_ID)
);

comment on table PROD_TRANSFERS is
'state para {
pedido,
enviado,
recibido
}';

/*==============================================================*/
/* Index: PROD_TRANSFER_PK                                      */
/*==============================================================*/
create unique index PROD_TRANSFER_PK on PROD_TRANSFERS (
PROD_TRANSFER_ID
);

/*==============================================================*/
/* Index: BRANCH_ORIGIN_FK                                      */
/*==============================================================*/
create  index BRANCH_ORIGIN_FK on PROD_TRANSFERS (
BR_ORIGIN_ID
);

/*==============================================================*/
/* Index: BRANCH_DESTINATION_FK                                 */
/*==============================================================*/
create  index BRANCH_DESTINATION_FK on PROD_TRANSFERS (
BR_DESTINATION_ID
);

/*==============================================================*/
/* Table: PROD_TRANSFER_DETAILS                                 */
/*==============================================================*/
create table PROD_TRANSFER_DETAILS (
   PT_DETAILS_ID        SERIAL               not null,
   PROD_TRANSFER_ID     INT4                 not null,
   PRODUCT_ID           INT4                 not null,
   PT_DET_QTY           INT4                 not null,
   STATE                BOOL                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_PROD_TRANSFER_DETAILS primary key (PT_DETAILS_ID)
);

comment on table PROD_TRANSFER_DETAILS is
'state para control de recepcion por producto';

/*==============================================================*/
/* Index: PROD_TRANSFER_DETAILS_PK                              */
/*==============================================================*/
create unique index PROD_TRANSFER_DETAILS_PK on PROD_TRANSFER_DETAILS (
PT_DETAILS_ID
);

/*==============================================================*/
/* Index: PROD_TRANSFER_ID_FK_PT_DETAILS                        */
/*==============================================================*/
create  index PROD_TRANSFER_ID_FK_PT_DETAILS on PROD_TRANSFER_DETAILS (
PROD_TRANSFER_ID
);

/*==============================================================*/
/* Index: PROD_ID_FK_PT_DETAILS                                 */
/*==============================================================*/
create  index PROD_ID_FK_PT_DETAILS on PROD_TRANSFER_DETAILS (
PRODUCT_ID
);


/*==============================================================*/
/* Table: ROLES                                                 */
/*==============================================================*/
create table ROLES (
   ROLE_ID              SERIAL               not null,
   ROLE_DESCRIP         VARCHAR(200)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_ROLES primary key (ROLE_ID)
);

/*==============================================================*/
/* Index: ROLE_PK                                               */
/*==============================================================*/
create unique index ROLE_PK on ROLES (
ROLE_ID
);

/*==============================================================*/
/* Table: SALES                                                 */
/*==============================================================*/
create table SALES (
   SALES_ID             SERIAL               not null,
   BRANCH_ID            INT4                 not null,
   PERSON_ID            INT4                 null,
   EMP_PERSON_ID        INT4                 null,
   SALE_DATE            DATE                 not null,
   RECEIPT_NUMBER       VARCHAR(20)          not null,
   APROBADO             BOOL                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_SALES primary key (SALES_ID)
);

/*==============================================================*/
/* Index: VENTA_PK                                              */
/*==============================================================*/
create unique index VENTA_PK on SALES (
SALES_ID
);

/*==============================================================*/
/* Index: BRANCH_FK_SALES                                       */
/*==============================================================*/
create  index BRANCH_FK_SALES on SALES (
BRANCH_ID
);

/*==============================================================*/
/* Index: CLIENT_FK_SALES                                       */
/*==============================================================*/
create  index CLIENT_FK_SALES on SALES (
PERSON_ID
);

/*==============================================================*/
/* Index: EMPLOYEE_FK_SALES                                     */
/*==============================================================*/
create  index EMPLOYEE_FK_SALES on SALES (
EMP_PERSON_ID
);

/*==============================================================*/
/* Table: SALES_DETAILS                                         */
/*==============================================================*/
create table SALES_DETAILS (
   SALES_DET_ID         SERIAL               not null,
   SALES_ID             INT4                 null,
   PRODUCT_ID           INT4                 null,
   SALE_PROD_QTY        INT4                 not null,
   SALE_DISCOUNT_       FLOAT(2)               not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_SALES_DETAILS primary key (SALES_DET_ID)
);

/*==============================================================*/
/* Index: SALES_DETAILS_PK                                      */
/*==============================================================*/
create unique index SALES_DETAILS_PK on SALES_DETAILS (
SALES_DET_ID
);

/*==============================================================*/
/* Index: SALES_FK_S_DETAILS                                    */
/*==============================================================*/
create  index SALES_FK_S_DETAILS on SALES_DETAILS (
SALES_ID
);

/*==============================================================*/
/* Index: PRODUCT_FK_S_DETAILS                                  */
/*==============================================================*/
create  index PRODUCT_FK_S_DETAILS on SALES_DETAILS (
PRODUCT_ID
);

/*==============================================================*/
/* Table: STOCK                                                 */
/*==============================================================*/
create table STOCK (
   STOCK_ID             SERIAL               not null,
   PRODUCT_ID           INT4                 not null,
   BRANCH_ID            INT4                 null,
   STOCK_QTY            INT4                 not null,
   STOCK_MIN            INT4                 not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_STOCK primary key (STOCK_ID)
);

/*==============================================================*/
/* Index: STOCK_PK                                              */
/*==============================================================*/
create unique index STOCK_PK on STOCK (
STOCK_ID
);

/*==============================================================*/
/* Index: PRODUCT_FK_STOCK                                      */
/*==============================================================*/
create  index PRODUCT_FK_STOCK on STOCK (
PRODUCT_ID
);

/*==============================================================*/
/* Index: BRACH_FK_STOCK                                        */
/*==============================================================*/
create  index BRACH_FK_STOCK on STOCK (
BRANCH_ID
);

/*==============================================================*/
/* Table: SUB_CATEGORY                                          */
/*==============================================================*/
create table SUB_CATEGORY (
   SUB_CAT_ID           SERIAL               not null,
   CAT_ID               INT4                 not null,
   SUB_CAT_DESCRIP      VARCHAR(100)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_SUB_CATEGORY primary key (SUB_CAT_ID)
);

/*==============================================================*/
/* Index: SUB_CATEGORIA_PK                                      */
/*==============================================================*/
create unique index SUB_CATEGORIA_PK on SUB_CATEGORY (
SUB_CAT_ID
);

/*==============================================================*/
/* Index: CATEGORY_SUB_CAT_FK                                   */
/*==============================================================*/
create  index CATEGORY_SUB_CAT_FK on SUB_CATEGORY (
CAT_ID
);

/*==============================================================*/
/* Table: TILLS                                                 */
/*==============================================================*/
create table TILLS (
   TILLS_ID             SERIAL               not null,
   BRANCH_ID            INT4                 null,
   T_OPEN_DATE          DATE                 not null,
   T_CLOSE_DATE         DATE                 not null,
   TILL_TRANSAC_DATE    DATE                 not null,
   TILL_STATE           BOOL                 not null,
   DESCRIPTION          VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_TILLS primary key (TILLS_ID)
);

/*==============================================================*/
/* Index: TILL_PK                                               */
/*==============================================================*/
create unique index TILL_PK on TILLS (
TILLS_ID
);

/*==============================================================*/
/* Index: BRANCH_FK_TILLS                                       */
/*==============================================================*/
create  index BRANCH_FK_TILLS on TILLS (
BRANCH_ID
);

/*==============================================================*/
/* Table: TILLS_DETAILS                                         */
/*==============================================================*/
create table TILLS_DETAILS (
   TILL_DETAILS_ID      SERIAL               not null,
   TILLS_ID             INT4                 null,
   M_TYPE_ID            INT4                 null,
   P_METHOD_ID          INT4                 null,
   DESCRIPTION          VARCHAR(255)         not null,
   AMOUNT               FLOAT8               not null,
   TRANSAC_DATE         DATE                 not null,
   DISCOUNT             FLOAT8               null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_TILLS_DETAILS primary key (TILL_DETAILS_ID)
);

/*==============================================================*/
/* Index: TILL_DETAILS_PK                                       */
/*==============================================================*/
create unique index TILL_DETAILS_PK on TILLS_DETAILS (
TILL_DETAILS_ID
);

/*==============================================================*/
/* Index: TILLS_FK_T_DETAILS                                    */
/*==============================================================*/
create  index TILLS_FK_T_DETAILS on TILLS_DETAILS (
TILLS_ID
);

/*==============================================================*/
/* Index: M_TYPE_FK_T_DETAILS                                   */
/*==============================================================*/
create  index M_TYPE_FK_T_DETAILS on TILLS_DETAILS (
M_TYPE_ID
);

/*==============================================================*/
/* Index: P_METHOD_FK_T_DETAILS                                 */
/*==============================================================*/
create  index P_METHOD_FK_T_DETAILS on TILLS_DETAILS (
P_METHOD_ID
);

/*==============================================================*/
/* Table: TILL_TRANSFERS                                        */
/*==============================================================*/
create table TILL_TRANSFERS (
   TILLTRANS_ID         SERIAL               not null,
   TILLS_ORIGIN_ID      INT4                 null,
   TILLS_DESTINY_ID     INT4                 null,
   TILLTRANS_DATE       DATE                 not null,
   TILLTRANS_AMOUNT     FLOAT8               not null,
   TILLTRANS_OBSERVATION TEXT                 null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_TILL_TRANSFERS primary key (TILLTRANS_ID)
);

comment on table TILL_TRANSFERS is
'Se registra las transferencias entre cajas';

/*==============================================================*/
/* Index: TTRANSF_ID_PK                                         */
/*==============================================================*/
create unique index TTRANSF_ID_PK on TILL_TRANSFERS (
TILLTRANS_ID
);

/*==============================================================*/
/* Index: T_ORIGIN_FK_T_TRANSFER                                */
/*==============================================================*/
create  index T_ORIGIN_FK_T_TRANSFER on TILL_TRANSFERS (
TILLS_ORIGIN_ID
);

/*==============================================================*/
/* Index: T_DERTINY_FK_T_TRANSFER                               */
/*==============================================================*/
create  index T_DERTINY_FK_T_TRANSFER on TILL_TRANSFERS (
TILLS_DESTINY_ID
);

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   USER_ID              SERIAL               not null,
   USER_NAME            VARCHAR(12)          not null,
   PASSWORD             VARCHAR(12)          not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_USER primary key (USER_ID)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on "USER" (
USER_ID
);

/*==============================================================*/
/* Table: WORKPLACES                                            */
/*==============================================================*/
create table WORKPLACES (
   WPLACE_ID            SERIAL               not null,
   DESCRIPTION          VARCHAR(255)         not null,
   ADDRESS              VARCHAR(255)         not null,
   TELEPHONE            VARCHAR(255)         not null,
   CREATED_AT           TIMESTAMP WITH TIME ZONE null,
   UPDATED_AT           TIMESTAMP WITH TIME ZONE null,
   DELETED_AT           TIMESTAMP WITH TIME ZONE null,
   constraint PK_WORKPLACES primary key (WPLACE_ID)
);

/*==============================================================*/
/* Index: WPLACE_PK                                             */
/*==============================================================*/
create unique index WPLACE_PK on WORKPLACES (
WPLACE_ID
);

alter table AUDIT
   add constraint FK_AUDIT_REFERENCE_USER foreign key (USER_ID)
      references "USER" (USER_ID)
      on delete restrict on update restrict;

alter table BUYS
   add constraint FK_BUYS_RELATIONS_PROVIDER foreign key (PERSON_ID)
      references PROVIDER (PERSON_ID)
      on delete restrict on update restrict;

alter table BUY_DETAILS
   add constraint FK_BUY_DETA_RELATIONS_PRODUCT foreign key (PRODUCT_ID)
      references PRODUCT (PRODUCT_ID)
      on delete restrict on update restrict;

alter table BUY_DETAILS
   add constraint FK_BUY_DETA_RELATIONS_BUYS foreign key (BUY_ID)
      references BUYS (BUY_ID)
      on delete restrict on update restrict;

alter table CLIENTS
   add constraint FK_CLIENTS_REFERENCE_PERSON foreign key (PERSON_ID)
      references PERSON (PERSON_ID)
      on delete restrict on update restrict;

alter table CLIENTS
   add constraint FK_CLIENTS_REFERENCE_WORKPLAC foreign key (WPLACE_ID)
      references WORKPLACES (WPLACE_ID)
      on delete restrict on update restrict;

alter table CONTACT_PERSON
   add constraint FK_CONTACT__REFERENCE_PERSON foreign key (PERSON_ID)
      references PERSON (PERSON_ID)
      on delete restrict on update restrict;

alter table CONTACT_PERSON
   add constraint FK_CONTACT__REFERENCE_CONTACT_ foreign key (CTYPE_ID)
      references CONTACT_TYPE (CTYPE_ID)
      on delete restrict on update restrict;

alter table CREDIT
   add constraint FK_CREDIT_REFERENCE_PETITIONER foreign key (PETITIONER_ID)
      references EMPLOYEES (PERSON_ID)
      on delete restrict on update restrict;

alter table CREDIT
   add constraint FK_CREDIT_REFERENCE_SUPERVISOR foreign key (SUPERVISOR_ID)
      references EMPLOYEES (PERSON_ID)
      on delete restrict on update restrict;

alter table CREDIT
   add constraint FK_CREDIT_REFERENCE_PERSON foreign key (PERSON_ID)
      references PERSON (PERSON_ID)
      on delete restrict on update restrict;

alter table CREDIT_FEE
   add constraint FK_CREDIT_F_RELATIONS_CREDIT foreign key (CREDIT_ID)
      references CREDIT (CREDIT_ID)
      on delete restrict on update restrict;

alter table DISTRICTS
   add constraint FK_DISTRICT_RELATIONS_CITY foreign key (CITY_ID)
      references CITY (CITY_ID)
      on delete restrict on update restrict;

alter table EMPLOYEES
   add constraint FK_EMPLOYEE_REFERENCE_APPOINTM foreign key (APPOIN_ID)
      references APPOINTMENTS (APPOIN_ID)
      on delete restrict on update restrict;

alter table EMPLOYEES
   add constraint FK_EMPLOYEE_REFERENCE_PERSON foreign key (PERSON_ID)
      references PERSON (PERSON_ID)
      on delete restrict on update restrict;

alter table EMPLOYEES
   add constraint FK_EMPLOYEE_REFERENCE_USER foreign key (USER_ID)
      references "USER" (USER_ID)
      on delete restrict on update restrict;

alter table EMPLOYEES
   add constraint FK_EMPLOYEE_REFERENCE_BRANCH foreign key (BRANCH_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table PERMITS
   add constraint FK_PERMITS_REFERENCE_ROLES foreign key (ROLE_ID)
      references ROLES (ROLE_ID)
      on delete restrict on update restrict;

alter table PERMITS_X_USER
   add constraint FK_PERMITS__REFERENCE_USER foreign key (USER_ID)
      references "USER" (USER_ID)
      on delete restrict on update restrict;

alter table PERMITS_X_USER
   add constraint FK_PERMITS__REFERENCE_PERMITS foreign key (PERMITS_ID)
      references PERMITS (PERMITS_ID)
      on delete restrict on update restrict;

alter table PERSON
   add constraint FK_PERSON_REFERENCE_DISTRICT foreign key (DISTRICT_ID)
      references DISTRICTS (DISTRICT_ID)
      on delete restrict on update restrict;

alter table PRODUCT
   add constraint FK_PRODUCT_REFERENCE_SUB_CATE foreign key (SUB_CAT_ID)
      references SUB_CATEGORY (SUB_CAT_ID)
      on delete restrict on update restrict;

alter table PRODUCT
   add constraint FK_PRODUCT_REFERENCE_BRAND foreign key (BRAND_ID)
      references BRAND (BRAND_ID)
      on delete restrict on update restrict;

alter table PRODUCT
   add constraint FK_PRODUCT_RELATIONS_PROVIDER foreign key (PERSON_ID)
      references PROVIDER (PERSON_ID)
      on delete restrict on update restrict;

alter table PROD_TRANSFERS
   add constraint FK_PROD_TRA_REFERENCE_DESTINO foreign key (BR_DESTINATION_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table PROD_TRANSFERS
   add constraint FK_PROD_TRA_REFERENCE_ORIGEN foreign key (BR_ORIGIN_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table PROD_TRANSFER_DETAILS
   add constraint FK_PROD_TRA_REFERENCE_PRODUCT foreign key (PRODUCT_ID)
      references PRODUCT (PRODUCT_ID)
      on delete restrict on update restrict;

alter table PROD_TRANSFER_DETAILS
   add constraint FK_PROD_TRA_REFERENCE_PROD_TRA foreign key (PROD_TRANSFER_ID)
      references PROD_TRANSFERS (PROD_TRANSFER_ID)
      on delete restrict on update restrict;

alter table PROVIDER
   add constraint FK_PROVIDER_REFERENCE_PERSON foreign key (PERSON_ID)
      references PERSON (PERSON_ID)
      on delete restrict on update restrict;

alter table SALES
   add constraint FK_SALES_REFERENCE_CLIENTS foreign key (PERSON_ID)
      references CLIENTS (PERSON_ID)
      on delete restrict on update restrict;

alter table SALES
   add constraint FK_SALES_REFERENCE_EMPLOYEE foreign key (EMP_PERSON_ID)
      references EMPLOYEES (PERSON_ID)
      on delete restrict on update restrict;

alter table SALES
   add constraint FK_SALES_RELATIONS_BRANCH foreign key (BRANCH_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table SALES_DETAILS
   add constraint FK_SALES_DE_RELATIONS_SALES foreign key (SALES_ID)
      references SALES (SALES_ID)
      on delete restrict on update restrict;

alter table SALES_DETAILS
   add constraint FK_SALES_DE_RELATIONS_PRODUCT foreign key (PRODUCT_ID)
      references PRODUCT (PRODUCT_ID)
      on delete restrict on update restrict;

alter table STOCK
   add constraint FK_STOCK_REFERENCE_BRANCH foreign key (BRANCH_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table STOCK
   add constraint FK_STOCK_RELATIONS_PRODUCT foreign key (PRODUCT_ID)
      references PRODUCT (PRODUCT_ID)
      on delete restrict on update restrict;

alter table SUB_CATEGORY
   add constraint FK_SUB_CATE_RELATIONS_CATEGORY foreign key (CAT_ID)
      references CATEGORY (CAT_ID)
      on delete restrict on update restrict;

alter table TILLS
   add constraint FK_TILLS_REFERENCE_BRANCH foreign key (BRANCH_ID)
      references BRANCH (BRANCH_ID)
      on delete restrict on update restrict;

alter table TILLS_DETAILS
   add constraint FK_TILLS_DE_REFERENCE_TILLS foreign key (TILLS_ID)
      references TILLS (TILLS_ID)
      on delete restrict on update restrict;

alter table TILLS_DETAILS
   add constraint FK_TILLS_DE_REFERENCE_MOVEMENT foreign key (M_TYPE_ID)
      references MOVEMENT_TYPE (M_TYPE_ID)
      on delete restrict on update restrict;

alter table TILLS_DETAILS
   add constraint FK_TILLS_DE_REFERENCE_PAYMENT_ foreign key (P_METHOD_ID)
      references PAYMENT_METHOD (P_METHOD_ID)
      on delete restrict on update restrict;

alter table TILL_TRANSFERS
   add constraint FK_TILL_TRA_REFERENCE_ORIGIN foreign key (TILLS_ORIGIN_ID)
      references TILLS (TILLS_ID)
      on delete restrict on update restrict;

alter table TILL_TRANSFERS
   add constraint FK_TILL_TRA_REFERENCE_DESTINY foreign key (TILLS_DESTINY_ID)
      references TILLS (TILLS_ID)
      on delete restrict on update restrict;

