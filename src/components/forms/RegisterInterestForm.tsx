"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CircleCheck,
  Loader2,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  buildRegisterInterestSchema,
  ESTIMATED_VALUES,
  HOLDING_PERIODS,
  INVESTMENT_AMOUNTS,
  NOTES_MAX_LEN,
  OWNER_PROPERTY_TYPES,
  PROPERTY_PREFS,
  REGISTRATION_TYPES,
  YES_NO,
  type ErrorBag,
  type RegisterInterestValues,
  type RegistrationType,
} from "@/lib/validations/register-interest";

// Standard react-hook-form Controller field shape, narrowed for plain text inputs.
type TextFieldShape = {
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

// ───────────────────────────── small reusable bits ─────────────────────────────

const SAUDI_CITY_KEYS = [
  "Riyadh",
  "Jeddah",
  "Makkah",
  "Madinah",
  "Dammam",
  "Khobar",
  "Dhahran",
  "Taif",
  "Tabuk",
  "Abha",
  "Khamis",
  "Hail",
  "Najran",
  "Jubail",
  "Yanbu",
  "Buraidah",
  "Unaizah",
  "Other",
] as const;

const PhoneInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input> & { dir: "rtl" | "ltr" }
>(function PhoneInput({ className, dir, ...props }, ref) {
  return (
    <div className="flex h-11 items-stretch overflow-hidden rounded-[10px] border border-hairline bg-paper transition-colors focus-within:border-osoul-pivot focus-within:ring-3 focus-within:ring-osoul-pivot/20">
      <span
        className="numerals-tabular numerals-ltr inline-flex select-none items-center bg-parchment/70 px-3 text-sm font-medium text-ink/80"
        aria-hidden="true"
      >
        +966
      </span>
      <Input
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        dir={dir}
        className={cn(
          "h-full flex-1 rounded-none border-0 bg-paper px-3 text-base shadow-none focus-visible:border-0 focus-visible:ring-0",
          className,
        )}
        {...props}
      />
    </div>
  );
});

type RadioCardGroupProps<T extends string> = {
  name: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: ReadonlyArray<{ value: T; label: string }>;
  columns?: 2 | 3 | 4;
};

function RadioCardGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  columns = 2,
}: RadioCardGroupProps<T>) {
  const colsClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";
  return (
    <div role="radiogroup" className={cn("grid grid-cols-1 gap-2.5", colsClass)}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "group relative flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[10px] border bg-paper px-4 py-3 text-sm font-medium text-ink transition-colors",
              "hover:border-osoul-pivot/40 hover:bg-parchment/60",
              "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-osoul-pivot/30",
              checked
                ? "border-osoul-pivot bg-parchment/70"
                : "border-hairline",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span className="leading-snug">{opt.label}</span>
            <span
              aria-hidden="true"
              className={cn(
                "inline-block size-4 shrink-0 rounded-full border-2 transition-colors",
                checked
                  ? "border-osoul-pivot bg-osoul-pivot ring-4 ring-osoul-pivot/15"
                  : "border-hairline",
              )}
            />
          </label>
        );
      })}
    </div>
  );
}

type ChipMultiSelectProps<T extends string> = {
  groupLabel: string;
  values: T[];
  onChange: (next: T[]) => void;
  options: ReadonlyArray<{ value: T; label: string }>;
};

function ChipMultiSelect<T extends string>({
  groupLabel,
  values,
  onChange,
  options,
}: ChipMultiSelectProps<T>) {
  const toggle = (v: T) => {
    onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  };
  return (
    <div role="group" aria-label={groupLabel} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = values.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            aria-pressed={selected}
            className={cn(
              "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-osoul-pivot/30",
              selected
                ? "border-osoul-pivot bg-osoul-pivot text-paper"
                : "border-hairline bg-paper text-ink hover:border-osoul-pivot/40 hover:bg-parchment/60",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

type TextareaWithCounterProps = ComponentProps<typeof Textarea> & {
  max: number;
  current: number;
};

function TextareaWithCounter({
  max,
  current,
  className,
  ...props
}: TextareaWithCounterProps) {
  const t = useTranslations("Register");
  const remaining = Math.max(max - current, 0);
  const tone = remaining < 50 ? "text-osoul-deep" : "text-muted-ink";
  return (
    <div className="relative">
      <Textarea
        rows={4}
        maxLength={max}
        className={cn(
          "min-h-32 rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30",
          className,
        )}
        {...props}
      />
      <span
        className={cn(
          "numerals-tabular numerals-ltr pointer-events-none absolute bottom-2 text-[0.7rem] end-3",
          tone,
        )}
        aria-live="polite"
      >
        {t("charsRemaining", { n: remaining })}
      </span>
    </div>
  );
}

// ───────────────────────────── type cards (Step 1) ─────────────────────────────

type TypeCardsProps = {
  selected: RegistrationType | null;
  onSelect: (t: RegistrationType) => void;
};

const TYPE_ICONS: Record<RegistrationType, ReactNode> = {
  investor: <TrendingUp className="size-6" aria-hidden="true" />,
  owner: <Building2 className="size-6" aria-hidden="true" />,
};

function TypeCards({ selected, onSelect }: TypeCardsProps) {
  const t = useTranslations("Register.types");
  return (
    <div
      role="radiogroup"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {REGISTRATION_TYPES.map((key, i) => {
        const isSelected = selected === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(key)}
            className={cn(
              "animate-rise group flex flex-col items-start gap-4 rounded-[10px] border bg-paper p-6 text-start transition-all sm:p-7",
              "hover:border-osoul-pivot/40 hover:bg-parchment/50",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-osoul-pivot/30",
              isSelected
                ? "border-osoul-pivot bg-parchment/70 shadow-rest"
                : "border-hairline",
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full transition-colors",
                isSelected
                  ? "bg-osoul-pivot text-paper"
                  : "bg-parchment text-osoul-deep",
              )}
            >
              {TYPE_ICONS[key]}
            </span>
            <div className="space-y-2">
              <span className="text-[1.0625rem] font-semibold text-ink">
                {t(`${key}Title`)}
              </span>
              <p className="max-w-[34ch] text-[0.9rem] leading-relaxed text-ink/70">
                {t(`${key}Body`)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────── form (Step 2) ─────────────────────────────

type Step2FormProps = {
  type: RegistrationType;
  form: UseFormReturn<RegisterInterestValues>;
  onBack: () => void;
  onSubmit: (values: RegisterInterestValues) => void | Promise<void>;
  submitting: boolean;
  submitError: boolean;
};

function Step2Form({
  type,
  form,
  onBack,
  onSubmit,
  submitting,
  submitError,
}: Step2FormProps) {
  const t = useTranslations("Register");
  const tFields = useTranslations("Register.fields");
  const tOptions = useTranslations("Register.options");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const headlineKey =
    type === "investor" ? "step2HeadlineInvestor" : "step2HeadlineOwner";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10"
        noValidate
      >
        <header className="animate-rise flex flex-col gap-2">
          <SectionEyebrow>{t("step2Eyebrow")}</SectionEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink">
              {t(headlineKey)}
            </h2>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-osoul-pivot transition-colors hover:text-osoul-deep"
            >
              <ArrowLeft
                className="rtl-flip size-4"
                aria-hidden="true"
              />
              <span>{t("back")}</span>
            </button>
          </div>
          <p className="text-xs text-muted-ink">{t("requiredHint")}</p>
        </header>

        {submitError ? (
          <Alert variant="destructive" className="animate-rise">
            <AlertTitle>{t("submitErrorTitle")}</AlertTitle>
            <AlertDescription>{t("submitErrorBody")}</AlertDescription>
          </Alert>
        ) : null}

        {/* Common section */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tFields("fullName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tFields("fullNamePh")}
                    autoComplete="name"
                    aria-required="true"
                    className="h-11 rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tFields("phone")}</FormLabel>
                <FormControl>
                  <PhoneInput
                    dir={dir}
                    placeholder={tFields("phonePh")}
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tFields("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={tFields("emailPh")}
                    aria-required="true"
                    className="h-11 rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{tFields("city")}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      aria-required="true"
                      className="h-11 w-full rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
                    >
                      <SelectValue placeholder={tFields("cityPh")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SAUDI_CITY_KEYS.map((k) => (
                      <SelectItem key={k} value={k}>
                        {tOptions(`city${k}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Type-specific */}
        {type === "investor" ? (
          <InvestorFields form={form} />
        ) : (
          <OwnerFields form={form} />
        )}

        <ConsentField form={form} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitting}
            aria-live="polite"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full bg-osoul-pivot px-6 text-[0.95rem] font-semibold text-paper shadow-rest transition-colors hover:bg-osoul-pivot/90 disabled:opacity-70 sm:w-auto",
            )}
          >
            {submitting ? (
              <>
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("submit")}</span>
                <ArrowRight
                  className="rtl-flip size-4"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}

// ───────────────────────────── per-type field groups ─────────────────────────────

function InvestorFields({
  form,
}: {
  form: UseFormReturn<RegisterInterestValues>;
}) {
  const tFields = useTranslations("Register.fields");
  const tOptions = useTranslations("Register.options");

  const amountOpts = INVESTMENT_AMOUNTS.map((v) => ({
    value: v,
    label: tOptions(
      v === "under10k"
        ? "amountUnder10k"
        : v === "from10to50k"
          ? "amount10to50k"
          : v === "from50to200k"
            ? "amount50to200k"
            : "amountAbove200k",
    ),
  }));

  const propOpts = PROPERTY_PREFS.map((v) => ({
    value: v,
    label: tOptions(
      v === "residential"
        ? "propResidential"
        : v === "commercial"
          ? "propCommercial"
          : v === "office"
            ? "propOffice"
            : "propNoPreference",
    ),
  }));

  const yesNoOpts = YES_NO.map((v) => ({
    value: v,
    label: tOptions(v === "yes" ? "yes" : "no"),
  }));

  const holdingOpts = HOLDING_PERIODS.map((v) => ({
    value: v,
    label: tOptions(
      v === "1y" ? "holding1y" : v === "3y" ? "holding3y" : "holding5y",
    ),
  }));

  return (
    <section className="space-y-8">
      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="investmentAmount"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("investmentAmount")}
            required
            error={fieldState.error?.message}
          >
            <RadioCardGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={amountOpts}
              columns={4}
            />
          </FieldBlock>
        )}
      />

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="preferredPropertyType"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("preferredPropertyType")}
            hint={tFields("preferredPropertyTypeHint")}
            required
            error={fieldState.error?.message}
          >
            <ChipMultiSelect
              groupLabel={tFields("preferredPropertyType")}
              values={(field.value as string[]) ?? []}
              onChange={field.onChange}
              options={propOpts}
            />
          </FieldBlock>
        )}
      />

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="previousInvestment"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("previousInvestment")}
            required
            error={fieldState.error?.message}
          >
            <RadioCardGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={yesNoOpts}
              columns={2}
            />
          </FieldBlock>
        )}
      />

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="holdingPeriod"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("holdingPeriod")}
            required
            error={fieldState.error?.message}
          >
            <RadioCardGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={holdingOpts}
              columns={3}
            />
          </FieldBlock>
        )}
      />
    </section>
  );
}

function OwnerFields({
  form,
}: {
  form: UseFormReturn<RegisterInterestValues>;
}) {
  const tFields = useTranslations("Register.fields");
  const tOptions = useTranslations("Register.options");
  const tRoot = useTranslations("Register");

  const propTypeOpts = OWNER_PROPERTY_TYPES.map((v) => ({
    value: v,
    label: tOptions(
      v === "apartment"
        ? "ownerPropApt"
        : v === "building"
          ? "ownerPropBuilding"
          : v === "mall"
            ? "ownerPropMall"
            : v === "land"
              ? "ownerPropLand"
              : v === "offices"
                ? "ownerPropOffices"
                : "ownerPropOther",
    ),
  }));

  const valueOpts = ESTIMATED_VALUES.map((v) => ({
    value: v,
    label: tOptions(
      v === "under1m"
        ? "valueUnder1m"
        : v === "from1to5m"
          ? "value1to5m"
          : v === "from5to20m"
            ? "value5to20m"
            : "valueAbove20m",
    ),
  }));

  const yesNoOpts = YES_NO.map((v) => ({
    value: v,
    label: tOptions(v === "yes" ? "yes" : "no"),
  }));

  // Watch notes for live char count
  const notes =
    ((form.watch("notes" as never) as unknown as string | undefined) ?? "");

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          control={form.control}
          name={"propertyType" as never}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>{tFields("propertyType")}</FormLabel>
              <Select value={field.value as string} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger
                    aria-required="true"
                    className="h-11 w-full rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
                  >
                    <SelectValue placeholder={tFields("propertyTypePh")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {propTypeOpts.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"cityDistrict" as never}
          render={({ field }) => {
            const f = field as unknown as TextFieldShape;
            return (
              <FormItem>
                <FormLabel required>{tFields("cityDistrict")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tFields("cityDistrictPh")}
                    aria-required="true"
                    className="h-11 rounded-[10px] border-hairline bg-paper text-base focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
                    name={f.name}
                    value={f.value ?? ""}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="estimatedValue"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("estimatedValue")}
            required
            error={fieldState.error?.message}
          >
            <RadioCardGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={valueOpts}
              columns={4}
            />
          </FieldBlock>
        )}
      />

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="currentlyRented"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={tFields("currentlyRented")}
            required
            error={fieldState.error?.message}
          >
            <RadioCardGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={yesNoOpts}
              columns={2}
            />
          </FieldBlock>
        )}
      />

      <Controller
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={form.control as any}
        name="notes"
        render={({ field, fieldState }) => (
          <FieldBlock
            label={`${tFields("notes")} (${tRoot("optional")})`}
            error={fieldState.error?.message}
          >
            <TextareaWithCounter
              placeholder={tFields("notesPh")}
              max={NOTES_MAX_LEN}
              current={notes.length}
              {...field}
              value={(field.value as string) ?? ""}
            />
          </FieldBlock>
        )}
      />
    </section>
  );
}

function FieldBlock({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">
          {label}
          {required ? (
            <span aria-hidden="true" className="ms-1 text-muted-ink">
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="text-xs text-muted-ink">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="text-xs leading-relaxed text-[oklch(45%_0.13_25)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ConsentField({
  form,
}: {
  form: UseFormReturn<RegisterInterestValues>;
}) {
  const t = useTranslations("Register.consent");
  return (
    <FormField
      control={form.control}
      name="consent"
      render={({ field, fieldState }) => (
        <FormItem className="rounded-[10px] border border-hairline bg-parchment/40 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="register-consent"
              checked={field.value === true}
              onCheckedChange={(v: boolean) => field.onChange(v === true)}
              className="mt-0.5"
              aria-required="true"
            />
            <div className="space-y-1">
              <label
                htmlFor="register-consent"
                className="cursor-pointer text-sm leading-relaxed text-ink"
              >
                {t("label")}
              </label>
              {fieldState.error?.message ? (
                <p className="text-xs leading-relaxed text-[oklch(45%_0.13_25)]">
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}

// ───────────────────────────── confirmation (Step 3) ─────────────────────────────

function Confirmation() {
  const t = useTranslations("Register");
  return (
    <div className="animate-rise mx-auto flex max-w-2xl flex-col items-start gap-6 rounded-[10px] border border-hairline bg-paper p-8 sm:p-10">
      <CircleCheck
        className="size-12 text-osoul-turquoise"
        aria-hidden="true"
      />
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink">
        {t("step3HeadlineSuccess")}
      </h2>
      <p className="text-base leading-relaxed text-ink/75">
        {t("successBody")}
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 bg-osoul-pivot px-5 text-paper hover:bg-osoul-pivot/90",
          )}
        >
          {t("backHome")}
        </Link>
        <Link
          href="/how-it-works"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 border-hairline bg-paper px-5 text-ink hover:bg-parchment",
          )}
        >
          {t("learnHow")}
        </Link>
      </div>
    </div>
  );
}

// ───────────────────────────── orchestrator ─────────────────────────────

const DEFAULTS: Record<RegistrationType, Partial<RegisterInterestValues>> = {
  investor: {
    type: "investor",
    fullName: "",
    phone: "",
    email: "",
    city: "",
    investmentAmount: undefined,
    preferredPropertyType: [],
    previousInvestment: undefined,
    holdingPeriod: undefined,
    consent: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  owner: {
    type: "owner",
    fullName: "",
    phone: "",
    email: "",
    city: "",
    propertyType: undefined,
    cityDistrict: "",
    estimatedValue: undefined,
    currentlyRented: undefined,
    notes: "",
    consent: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
};

function isRegistrationType(v: string | null): v is RegistrationType {
  return v === "investor" || v === "owner";
}

export function RegisterInterestForm() {
  const t = useTranslations("Register");
  const tErrors = useTranslations("Register.errors");
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");
  const initialType = isRegistrationType(queryType) ? queryType : null;

  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    initialType,
  );
  const [phase, setPhase] = useState<"select" | "form" | "success">(
    initialType ? "form" : "select",
  );
  const [submitError, setSubmitError] = useState(false);
  const [isPending, startTransition] = useTransition();

  // React to URL changes (back/forward)
  const lastSyncedQuery = useRef(queryType);
  useEffect(() => {
    if (lastSyncedQuery.current === queryType) return;
    lastSyncedQuery.current = queryType;
    if (isRegistrationType(queryType)) {
      setSelectedType(queryType);
      setPhase("form");
    } else {
      setSelectedType(null);
      setPhase("select");
    }
  }, [queryType]);

  const errorBag: ErrorBag = useMemo(
    () => ({
      fullNameRequired: tErrors("fullNameRequired"),
      fullNameTooShort: tErrors("fullNameTooShort"),
      phoneRequired: tErrors("phoneRequired"),
      phoneInvalid: tErrors("phoneInvalid"),
      emailRequired: tErrors("emailRequired"),
      emailInvalid: tErrors("emailInvalid"),
      cityRequired: tErrors("cityRequired"),
      investmentAmountRequired: tErrors("investmentAmountRequired"),
      preferredPropertyTypeRequired: tErrors("preferredPropertyTypeRequired"),
      previousInvestmentRequired: tErrors("previousInvestmentRequired"),
      holdingPeriodRequired: tErrors("holdingPeriodRequired"),
      propertyTypeRequired: tErrors("propertyTypeRequired"),
      cityDistrictRequired: tErrors("cityDistrictRequired"),
      estimatedValueRequired: tErrors("estimatedValueRequired"),
      currentlyRentedRequired: tErrors("currentlyRentedRequired"),
      notesTooLong: tErrors("notesTooLong"),
      consentRequired: tErrors("consentRequired"),
    }),
    [tErrors],
  );

  const schema = useMemo(
    () => buildRegisterInterestSchema(errorBag),
    [errorBag],
  );

  const form = useForm<RegisterInterestValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: (selectedType ? DEFAULTS[selectedType] : DEFAULTS.investor) as any,
  });

  // Reset form when switching type
  useEffect(() => {
    if (!selectedType) return;
    form.reset(DEFAULTS[selectedType] as RegisterInterestValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const updateUrl = useCallback(
    (next: RegistrationType | null) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("type", next);
      else url.searchParams.delete("type");
      window.history.replaceState(window.history.state, "", url);
      lastSyncedQuery.current = next;
    },
    [],
  );

  const handleSelect = (next: RegistrationType) => {
    setSelectedType(next);
    setPhase("form");
    updateUrl(next);
    setSubmitError(false);
  };

  const handleBack = () => {
    setSelectedType(null);
    setPhase("select");
    updateUrl(null);
    setSubmitError(false);
  };

  const handleSubmit = async (values: RegisterInterestValues) => {
    setSubmitError(false);
    startTransition(async () => {
      try {
        await new Promise<void>((resolve) => setTimeout(resolve, 1200));
        // Stub: real submission will call /api/register-interest later.
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.info("[register-interest] submitted", values);
        }
        setPhase("success");
        // Clear the type query param on success.
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("type");
          window.history.replaceState(window.history.state, "", url);
        }
      } catch {
        setSubmitError(true);
      }
    });
  };

  return (
    <section className="bg-paper">
      <Container className="py-16 sm:py-20 lg:py-24">
        <header className="animate-rise mx-auto max-w-3xl">
          <SectionEyebrow>{t("heroEyebrow")}</SectionEyebrow>
          <h1 className="mt-5 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
            {t("heroHeadline")}
          </h1>
          <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg">
            {t("heroSub")}
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
          {phase === "select" ? (
            <div className="space-y-8">
              <header className="animate-rise">
                <SectionEyebrow>{t("step1Eyebrow")}</SectionEyebrow>
                <h2 className="mt-3 text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-tight text-ink">
                  {t("step1Headline")}
                </h2>
              </header>
              <TypeCards selected={selectedType} onSelect={handleSelect} />
            </div>
          ) : phase === "form" && selectedType ? (
            <Step2Form
              type={selectedType}
              form={form}
              onBack={handleBack}
              onSubmit={handleSubmit}
              submitting={isPending}
              submitError={submitError}
            />
          ) : (
            <Confirmation />
          )}
        </div>
      </Container>
    </section>
  );
}
