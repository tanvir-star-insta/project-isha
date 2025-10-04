import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

const approvalStepSchema = z.object({
  approverId: z.string().min(1, "Approver is required"),
  order: z.number(),
});

const approvalRuleSchema = z.object({
  name: z.string().min(1, "Rule name is required"),
  minAmount: z.string().min(1, "Minimum amount is required"),
  maxAmount: z.string().optional(),
  requireManagerApproval: z.boolean(),
  approvalSteps: z.array(approvalStepSchema),
  percentageRequired: z.string().optional(),
  specificApproverId: z.string().optional(),
});

type ApprovalRuleFormData = z.infer<typeof approvalRuleSchema>;

const mockApprovers = [
  { id: "1", name: "Sarah Johnson - Finance Manager" },
  { id: "2", name: "David Smith - Director" },
  { id: "3", name: "Lisa Wang - CFO" },
];

interface ApprovalRulesFormProps {
  onSubmit?: (data: ApprovalRuleFormData) => void;
}

export function ApprovalRulesForm({ onSubmit }: ApprovalRulesFormProps) {
  const form = useForm<ApprovalRuleFormData>({
    resolver: zodResolver(approvalRuleSchema),
    defaultValues: {
      name: "",
      minAmount: "",
      maxAmount: "",
      requireManagerApproval: true,
      approvalSteps: [{ approverId: "", order: 1 }],
      percentageRequired: "",
      specificApproverId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "approvalSteps",
  });

  const handleSubmit = (data: ApprovalRuleFormData) => {
    onSubmit?.(data);
    console.log("Approval rule created:", data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Approval Rule</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rule Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Standard Travel Expenses" {...field} data-testid="input-rule-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="minAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Amount (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} data-testid="input-min-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Amount (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Unlimited" {...field} data-testid="input-max-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requireManagerApproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Require Manager Approval First
                    </FormLabel>
                    <FormDescription>
                      Direct manager must approve before other approvers
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-manager-approval"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Approval Steps</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ approverId: "", order: fields.length + 1 })}
                  data-testid="button-add-step"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`approvalSteps.${index}.approverId`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Step {index + 1} Approver</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid={`select-approver-${index}`}>
                              <SelectValue placeholder="Select approver" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockApprovers.map((approver) => (
                              <SelectItem key={approver.id} value={approver.id}>
                                {approver.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      data-testid={`button-remove-step-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="text-sm font-medium">Conditional Rules (Optional)</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="percentageRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 60"
                          {...field}
                          data-testid="input-percentage"
                        />
                      </FormControl>
                      <FormDescription>% of approvers needed</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specificApproverId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Approver (Auto-approve)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-specific-approver">
                            <SelectValue placeholder="Select approver" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {mockApprovers.map((approver) => (
                            <SelectItem key={approver.id} value={approver.id}>
                              {approver.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Auto-approve if this person approves
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" data-testid="button-save-rule">
              Save Approval Rule
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
