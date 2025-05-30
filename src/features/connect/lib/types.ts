export interface PostalAddress {
    /**
     * Address line 1 (e.g., street, PO Box, or company name).
     */
    address_line1?: string;
    /**
     * Address line 2 (e.g., apartment, suite, unit, or building).
     */
    address_line2?: string;
    /**
     * City, district, suburb, town, or village.
     */
    city?: string;
    /**
     * Two-letter country code (ISO 3166-1 alpha-2).
     */
    country_code?: string;
    /**
     * ZIP or postal code.
     */
    post_code?: string;
    /**
     * State, county, province, or region.
     */
    state?: string;
}

export type ActionException = {
    code:       string;
    live_mode:  boolean;
    message:    string;
    object:     string;
    connect_token: string;
    type:       string;
    request_id?: string;
}

export type TariffTemplate = {
    id: string;
    name: string;
    description: string;
}

export type RateEntry = {
    tariff: {
        confidence: number,
        cost: number,
    }
    valid_from: string;
    valid_to: string;
}
export type RateEntryDecorated = RateEntry & {
    peak: PeakType
}

export type ProviderSummary = {
    id: string;
    display_name: string;
    logo_url: string;
}
export type ContractDirection = "IMPORT" | "EXPORT";
export type TariffStructureOption = "FIXED" | "TIME_OF_DAY" | "MARKET";

export type PeakType = "Low" | "Medium" | "High";
export type TariffStructureType = 'FIXEDRATE' | 'TIMEOFUSE' | 'MARKET';
export type RatePeriodType = "today" | "yesterday" | "tomorrow";

export interface CommonRenderRoute<T extends RenderRouteKey = RenderRouteKey> {
    route: T;
    connect_token: string;
    type: "render",
    live_mode: boolean,
    direction: ContractDirection,
    data: RenderRouteDataMapping[T],
    actions?: T extends keyof RouteActionsMapping ? Array<RouteActionsMapping[T]> : undefined,
}

export type CommonSubmitRoute<T extends SubmitRouteKey = SubmitRouteKey> = {
    route: T;
    connect_token?: string;
    type: "submit",
    action?: T extends keyof RouteActionsMapping ? RouteActionsMapping[T] : undefined,
    data?: T extends keyof SubmitRouteMapping ? SubmitRouteMapping[T] : undefined
} & CommonSubmitRouteExtra<T>

export type CommonSubmitRouteExtra<T> = T extends keyof ExtrasSubmitRouteMapping ? ExtrasSubmitRouteMapping[T] : object

export type RenderRouteKey = keyof RenderRouteDataMapping;
export type SubmitRouteKey = keyof SubmitRouteMapping;

interface RouteActionsMapping {
    summary_tariff_inprogress: "SAVE" | "DISCONNECT" | "DISMISS_DIRECT";
    summary_tou_confirm: "SAVE" | "EDIT" | "DISCONNECT";
    summary_fixed_confirm: "SAVE" | "EDIT" | "DISCONNECT";
    summary_tariff_failed: "DISCONNECT" | "RECONNECT";
    tariff_select: "TARIFF_MISSING" | "ADDRESS_CHANGE";
    provider_select: "PROVIDER_MISSING" | "ADDRESS_CHANGE";
}
interface ExtrasSubmitRouteMapping {
    init_tariff: {
        version: string;
        direction: ContractDirection
    }
}
interface RenderRouteDataMapping {
    summary_tariff_inprogress: RenderTariffInProgress;
    summary_tariff_failed: RenderSummaryTariffFailed;
    postal_address_capture: RenderPostalAddressCapture;
    provider_select: RenderProviderSelect;
    provider_name_capture: RenderProviderNameCapture;
    tariff_select: RenderTariffSelect;
    tariff_name_capture: RenderTariffNameCapture;
    tariff_structure_select: RenderTariffStructureSelect;
    contract_term_capture: RenderContractTermCapture;
    rate_fixed_capture: RenderRateFixedCapture;
    rate_tod_capture: RenderRateTodCapture;
    market_surcharge_capture: RenderMarketSurchargeCapture;
    summary_fixed_confirm: RenderSummaryFixedConfirm;
    summary_tou_confirm: RenderSummaryTouConfirm;
    // session_redirect: RenderSessionRedirect;
    // session_complete: RenderSessionComplete;
    complete_tariff: RenderComplete;
    error: RenderError;
}

interface SubmitRouteMapping {
    start_tariff: SubmitStartTariff;
    session_restore: never;
    session_redirect: never;
    postal_address_capture: SubmitPostalAddressCapture;
    provider_select: SubmitProviderSelect;
    provider_name_capture: SubmitProviderNameCapture;
    tariff_select: SubmitTariffSelect;
    tariff_name_capture: SubmitTariffNameCapture;
    tariff_structure_select: SubmitTariffStructureSelect;
    contract_term_capture: SubmitContractTermCapture;
    rate_fixed_capture: SubmitRateFixedCapture;
    rate_tod_capture: SubmitRateTodCapture;
    market_surcharge_capture: SubmitMarketSurchargeCapture;
    summary_fixed_confirm: SubmitSummaryFixedConfirm;
    summary_tou_confirm: SubmitSummaryTouConfirm;
    summary_tariff_inprogress: SubmitTariffInProgress;
    summary_tariff_failed: SubmitSummaryTariffFailed;
    complete_tariff: undefined;
    error: undefined;
}


type SubmitStartTariff = {
    route: "start-tariff";
    connect_token: string;
}

export type HasProviderSummaryTrait = {
    "provider": ProviderSummary;
}


export type HasPostalAddressTrait = {
    postal_address: PostalAddress;
}


export type RenderPostalAddressCapture = HasPostalAddressTrait;
export type SubmitPostalAddressCapture = HasPostalAddressTrait;

export type RenderTariffInProgress = HasProviderSummaryTrait;
export type SubmitTariffInProgress = HasProviderSummaryTrait;

export type RenderSummaryTariffFailed = HasProviderSummaryTrait;
export type SubmitSummaryTariffFailed = HasProviderSummaryTrait;

export type RenderProviderSelect = {
    providers: Array<ProviderSummary>
} & HasPostalAddressTrait;
export type SubmitProviderSelect = { provider: {id: string } }

export type RenderProviderNameCapture = {
    provider: {name: string }
} & HasPostalAddressTrait;
export type SubmitProviderNameCapture = { provider: {name: string } };


export type RenderTariffSelect = {
    tariffs: Array<TariffTemplate>
} & HasPostalAddressTrait & HasProviderSummaryTrait;
export type SubmitTariffSelect = { tariff: {id: string } };

export type RenderTariffNameCapture = {
    tariff: {name: string }
} & HasProviderSummaryTrait;
export type SubmitTariffNameCapture = { tariff: {name: string } };


export type RenderContractTermCapture = {
    contract_end_date: string
} & HasProviderSummaryTrait;
export type SubmitContractTermCapture = { contract_end_date: Date };


export type RenderTariffStructureSelect = {
    options: Array<TariffStructureOption>
} & HasProviderSummaryTrait;
export type SubmitTariffStructureSelect = { options: Array<TariffStructureOption>};

export type RenderRateFixedCapture = {
    currency_code: string;
    cost: number;
} & HasProviderSummaryTrait;
export type SubmitRateFixedCapture = { cost: number};


export type RenderRateTodCapture = {
    currency_code: string;
    hours: Array<{
        cost: number,
        valid_from: string;
        valid_to: string;
    }>
} & HasProviderSummaryTrait;
export type SubmitRateTodCapture = {
    hours: Array<{
        cost: number,
        valid_from: string;
        valid_to: string;
    }>
};


export type RenderMarketSurchargeCapture = {
    currency_code: string;
    surcharge: {
        fixed: number;
        percentage: number;
    },
    regions?: Array<string>
    region?: string
} & HasProviderSummaryTrait;
export type SubmitMarketSurchargeCapture = {
    surcharge: {
        fixed: number;
        percentage: number;
    },
    region?: string;
};

export type RenderSummaryFixedConfirm = {
    currency_code: string;
    cost: number;
    tariff: {
        name: string;
        contract_end_date?: string;
        reconnect_required?: boolean;
        structure_type?: "FIXED";
        tiered?: boolean
    },
} & HasProviderSummaryTrait;
export type SubmitSummaryFixedConfirm = never;

export type RenderSummaryTouConfirm = {
    currency_code: string;
    market_rates_source: boolean;
    tariff: {
        name: string;
        contract_end_date?: string;
        reconnect_required?: boolean;
        structure_type?: "TIME_OF_DAY";
        tiered?: boolean;
    },
    "rates": Record<"today"|"yesterday"|"tomorrow", Array<RateEntry>>;
} & HasProviderSummaryTrait;
export type SubmitSummaryTouConfirm = never;


export type RenderComplete = never;

export type RenderError = {
    connect_token: string;
    route: string;
    live_mode: boolean;
    error_code: string;
    error_message: string;
};

export type RenderSessionRedirect = { redirect_uri: string };
export type RenderSessionComplete = { callback_uri: string };
