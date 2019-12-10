USE [CPPDATA]

GO

 

/****** Object:  Table [dbo].[AUDIT_DATA_CHANGES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[AUDIT_DATA_CHANGES](

       [AUDIT_ID] [int] IDENTITY(1,1) NOT NULL,

       [AUDIT_TYPE_ID] [int] NOT NULL,

       [CUSTOMER_ID] [int] NULL,

       [POLICY_ID] [int] NULL,

       [USER_ID] [int] NULL,

       [EXPLANATION] [varchar](max) NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_NAME] [varchar](100) NULL,

       [M_USER_ID] [int] NULL,

CONSTRAINT [PK_AUDIT_DATA_CHANGES] PRIMARY KEY CLUSTERED

(

       [AUDIT_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[AUDIT_TYPES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[AUDIT_TYPES](

       [AUDIT_TYPE_ID] [int] IDENTITY(1,1) NOT NULL,

       [AUDIT_TYPE] [varchar](100) NULL,

       [EXPLANATION] [varchar](max) NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

CONSTRAINT [PK_AUDIT_TYPES] PRIMARY KEY CLUSTERED

(

       [AUDIT_TYPE_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[BENEFIT_PACK_BENEFITS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[BENEFIT_PACK_BENEFITS](

       [BENEFIT_PACK_BENEFIT_ID] [int] IDENTITY(1,1) NOT NULL,

       [BENEFIT_ID] [int] NOT NULL,

       [BENEFIT_PACK_ID] [int] NOT NULL,

       [ORDER_NUMBER] [int] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_BENEFIT_PACK_BENEFITS] PRIMARY KEY CLUSTERED

(

       [BENEFIT_PACK_BENEFIT_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[BENEFIT_PACKS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[BENEFIT_PACKS](

       [BENEFIT_PACK_ID] [int] IDENTITY(1,1) NOT NULL,

       [BENEFIT_PACK] [varchar](100) NULL,

       [ACTIVE] [bit] NOT NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [OLD_BENEFIT_PACK_ID] [int] NULL,

CONSTRAINT [PK_BENEFIT_PACKS] PRIMARY KEY CLUSTERED

(

       [BENEFIT_PACK_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[BENEFITS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[BENEFITS](

       [BENEFIT_ID] [int] IDENTITY(1,1) NOT NULL,

       [BENEFIT] [varchar](250) NULL,

       [EXPLANATION] [varchar](max) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [OLD_BENEFIT_ID] [int] NULL,

CONSTRAINT [PK_BENEFITS] PRIMARY KEY CLUSTERED

(

       [BENEFIT_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[CANCEL_REASONS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[CANCEL_REASONS](

       [CANCEL_REASON_ID] [int] IDENTITY(1,1) NOT NULL,

       [CANCEL_REASON] [varchar](100) NULL,

       [CANCEL_REASON_TYPE] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [DELETED] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

CONSTRAINT [PK_CANCEL_REASONS] PRIMARY KEY CLUSTERED

(

       [CANCEL_REASON_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[CITIES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[CITIES](

       [CITY_ID] [int] IDENTITY(1,1) NOT NULL,

       [CITY_CODE] [varchar](10) NULL,

       [COUNTRY_ID] [int] NULL,

       [CITY] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_CITIES] PRIMARY KEY CLUSTERED

(

       [CITY_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[COUNTRIES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[COUNTRIES](

       [COUNTRY_ID] [int] IDENTITY(1,1) NOT NULL,

       [COUNTRY_CODE] [varchar](5) NULL,

       [PHONE_CODE] [varchar](5) NULL,

       [COUNTRY] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_COUNTRIES] PRIMARY KEY CLUSTERED

(

       [COUNTRY_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[CURRENCIES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[CURRENCIES](

       [CURRENCY_ID] [int] IDENTITY(1,1) NOT NULL,

       [CURRENCY] [varchar](50) NULL,

       [PREFIX] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_CURRENCIES] PRIMARY KEY CLUSTERED

(

       [CURRENCY_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[CUSTOMER_ADDRESSES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[CUSTOMER_ADDRESSES](

       [ADDRESS_ID] [int] IDENTITY(1,1) NOT NULL,

       [CUSTOMER_ID] [int] NULL,

       [ADDRESS_TYPE] [varchar](10) NULL,

       [ADDRESS] [varchar](500) NULL,

       [CITY_ID] [int] NULL,

       [COUNTRY_ID] [int] NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_CUSTOMER_ADDRESSES] PRIMARY KEY CLUSTERED

(

       [ADDRESS_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[CUSTOMERS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[CUSTOMERS](

       [CUSTOMER_ID] [int] IDENTITY(1,1) NOT NULL,

       [FIRST_NAME] [varchar](100) NULL,

       [LAST_NAME] [varchar](100) NULL,

       [NATIONAL_ID] [varchar](20) NULL,

       [CUSTOMER_TYPE] [varchar](15) NULL,

       [MOBILE_PHONE] [varchar](30) NULL,

       [WORK_PHONE] [varchar](30) NULL,

       [HOME_PHONE] [varchar](30) NULL,

       [EMAIL] [varchar](100) NULL,

       [EXPLANATION] [varchar](max) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [PERSON_ID] [int] NULL,

CONSTRAINT [PK_CUSTOMERS] PRIMARY KEY CLUSTERED

(

       [CUSTOMER_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[PARTNER_CHANNELS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[PARTNER_CHANNELS](

       [PARTNER_CHANNEL_ID] [int] IDENTITY(1,1) NOT NULL,

       [PARTNER_CHANNEL] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_PARTNER_CHANNELS] PRIMARY KEY CLUSTERED

(

       [PARTNER_CHANNEL_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[PARTNERS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[PARTNERS](

       [PARTNER_ID] [int] IDENTITY(1,1) NOT NULL,

       [PARTNER] [varchar](200) NULL,

       [ACTIVE] [bit] NOT NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [OLD_PARTNER_ID] [int] NULL,

CONSTRAINT [PK_PARTNERS] PRIMARY KEY CLUSTERED

(

       [PARTNER_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[PERMISSIONS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[PERMISSIONS](

       [PERMISSION_ID] [int] IDENTITY(1,1) NOT NULL,

       [PERMISSION] [varchar](100) NULL,

       [PERMISION_KEY] [varchar](10) NULL,

       [ACTIVE] [bit] NULL,

       [PERMISSION_TYPE] [varchar](10) NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_PERMISSIONS] PRIMARY KEY CLUSTERED

(

       [PERMISSION_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[POLICIES]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[POLICIES](

       [POLICY_ID] [int] IDENTITY(1,1) NOT NULL,

       [PRODUCT_ID] [int] NULL,

       [CUSTOMER_ID] [int] NULL,

       [POLICY_NUMBER] [varchar](30) NULL,

       [STATUS] [varchar](20) NULL,

       [START_DATE] [datetime] NULL,

       [RENEWAL_DATE] [datetime] NULL,

       [PREVIOUS_RENEWAL_DATE] [datetime] NULL,

       [CANCELLATION_DATE] [datetime] NULL,

       [EXTERNAL_POLICY_NUMBER] [varchar](30) NULL,

       [ASSET] [varchar](100) NULL,

       [RENEWAL_COLLECTION_DATE] [datetime] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [OLD_POLICY_ID] [int] NULL,

CONSTRAINT [PK_POLICIES] PRIMARY KEY CLUSTERED

(

       [POLICY_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[PRODUCTS]    Script Date: 10.12.2019 10:43:19 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[PRODUCTS](

       [PRODUCT_ID] [int] IDENTITY(1,1) NOT NULL,

       [PRODUCT] [varchar](100) NULL,

       [BUSINESS_MODEL] [varchar](20) NULL,

       [BUSINESS_PARTNER_ID] [int] NULL,

       [PARTNER_CHANNEL_ID] [int] NULL,

       [SOLDBY] [varchar](10) NULL,

       [BENEFIT_PACK_ID] [int] NULL,

       [SERVICE_TYPE_ID] [int] NULL,

       [POLICY_LENGHT_MONTHS] [int] NULL,

       [REFUND_CANCEL_PERIOD_DAYS] [int] NULL,

       [PRODUCT_TYPE] [varchar](20) NULL,

       [WELCOME] [bit] NULL,

       [RENEWAL] [bit] NULL,

       [GUIDE] [bit] NULL,

       [DUPLICATE_CONTROL] [bit] NULL,

       [NEW_COMMISSION_RATE] [float] NULL,

       [RENEWAL_COMMISSION_RATE] [float] NULL,

       [MIGRATION_PRODUCT_ID] [int] NULL,

       [MIGRATION_DATE] [datetime] NULL,

       [ACTIVE] [bit] NULL,

       [EXPLANATION] [varchar](max) NULL,

       [PRICE] [float] NULL,

       [CURRENCY] [varchar](3) NULL,

       [OLD_PRODUCT_ID] [int] NULL,

       [OLD_CAMPAIGN_ID] [int] NULL,

       [PRODUCT_SALE_TYPE] [varchar](20) NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_PRODUCTS] PRIMARY KEY CLUSTERED

(

       [PRODUCT_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[ROLE_PERMISSIONS]    Script Date: 10.12.2019 10:43:20 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[ROLE_PERMISSIONS](

       [ROLE_PERMISSION_ID] [int] IDENTITY(1,1) NOT NULL,

       [ROLE_ID] [int] NOT NULL,

       [PERMISSION] [varchar](100) NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_ROLE_PERMISSIONS] PRIMARY KEY CLUSTERED

(

       [ROLE_PERMISSION_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[ROLES]    Script Date: 10.12.2019 10:43:20 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[ROLES](

       [ROLE_ID] [int] IDENTITY(1,1) NOT NULL,

       [ROLE] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

CONSTRAINT [PK_ROLES] PRIMARY KEY CLUSTERED

(

       [ROLE_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[SERVICE_TYPES]    Script Date: 10.12.2019 10:43:20 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[SERVICE_TYPES](

       [SERVICE_TYPE_ID] [int] IDENTITY(1,1) NOT NULL,

       [SERVICE_TYPE] [varchar](100) NULL,

       [PREFIX] [varchar](50) NULL,

       [ACTIVE] [bit] NULL,

       [DELETED] [bit] NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

CONSTRAINT [PK_SERVICE_TYPES] PRIMARY KEY CLUSTERED

(

       [SERVICE_TYPE_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[USER_PASSWORDS]    Script Date: 10.12.2019 10:43:20 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[USER_PASSWORDS](

       [PASSWORD_ID] [int] IDENTITY(1,1) NOT NULL,

       [USER_ID] [int] NOT NULL,

       [PASSWORD] [varchar](200) NULL,

       [C_DATE] [datetime] NULL,

CONSTRAINT [PK_USER_PASSWORDS] PRIMARY KEY CLUSTERED

(

       [PASSWORD_ID] DESC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 

/****** Object:  Table [dbo].[USERS]    Script Date: 10.12.2019 10:43:20 ******/

SET ANSI_NULLS ON

GO

 

SET QUOTED_IDENTIFIER ON

GO

 

CREATE TABLE [dbo].[USERS](

       [USER_ID] [int] IDENTITY(1,1) NOT NULL,

       [NAME] [varchar](100) NOT NULL,

       [EMAIL] [varchar](100) NOT NULL,

       [ACTIVE] [bit] NOT NULL,

       [PASSWORD] [varchar](200) NULL,

       [REMEMBER_URL] [varchar](250) NULL,

       [C_DATE] [datetime] NULL,

       [C_USER_ID] [int] NULL,

       [M_DATE] [datetime] NULL,

       [M_USER_ID] [int] NULL,

       [DELETED] [bit] NULL,

       [ATTACK] [int] NULL,

       [PASSWORD_LOCKED] [bit] NULL,

       [ROLE_ID] [int] NULL,

CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED

(

       [USER_ID] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

GO

 