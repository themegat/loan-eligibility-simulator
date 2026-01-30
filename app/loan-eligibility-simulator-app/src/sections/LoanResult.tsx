import { Button, Stack, Typography } from "@mui/material";
import type {
  CalculateRateResponse,
  EligibilityResponse,
} from "../store/loansApi";
import LoanResultItem from "../components/LoanResultItem";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import type { StepData } from "../models/StepData";
import useLoans from "../hooks/useLoans";

type Props = {
  stepsData: StepData | null;
  eligibilityResponse: EligibilityResponse | null;
};

const LoanResult = ({ stepsData, eligibilityResponse }: Props) => {
  const { calculatePaymentSchedule } = useLoans();
  const handleRecheckEligibility = () => {
    window.location.reload();
  };

  const generateAmortisationChart = (response: CalculateRateResponse) => {
    if (Chart.getChart("amortisation")) {
      Chart.getChart("amortisation")?.destroy();
    }
    const ctx = document.getElementById(
      "amortisation",
    ) as HTMLCanvasElement | null;
    let mixedChart: Chart<"line" | "bar", number[], string> | null = null;
    if (ctx) {
      mixedChart = new Chart(ctx, {
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              ticks: { maxRotation: 90, minRotation: 90 },
            },
          },
        },
        data: {
          datasets: [
            {
              type: "line",
              label: "Interest (%)",
              backgroundColor: "#00000",
              data: response.paymentSchedules.map(
                (paymentSchedule) => Number(paymentSchedule.interest) * 10,
              ),
            },
            {
              type: "bar",
              label: "Principal (R)",
              backgroundColor: "#E63934",
              data: response.paymentSchedules.map((paymentSchedule) =>
                Number(paymentSchedule.principal),
              ),
            },
            {
              type: "bar",
              label: "Balance (R)",
              backgroundColor: "#2F70EF",
              data: response.paymentSchedules.map((paymentSchedule) =>
                Number(paymentSchedule.balance),
              ),
            },
          ],
          labels: response.paymentSchedules.map(
            (paymentSchedule) => paymentSchedule.month?.toString() ?? "",
          ),
        },
      });
      return mixedChart;
    }
    return null;
  };

  useEffect(() => {
    let chart: Chart | null = null;

    if (stepsData) {
      calculatePaymentSchedule(stepsData).then((response) => {
        if (!chart) {
          chart = generateAmortisationChart(response);
        }
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <Stack>
      {eligibilityResponse?.eligibilityResult.isEligible ? (
        <Stack gap={5}>
          <Typography variant="h5">
            Great news, you are eligible for a loan of up to R{" "}
            {eligibilityResponse.recommendedLoan.maxAmount}
          </Typography>
          <Stack direction="row" alignItems="center" gap={5}>
            <Stack>
              <LoanResultItem
                title="Your likelyhood of being approved is: "
                value={`${eligibilityResponse.eligibilityResult.approvalLikelihood}%`}
              />
              <LoanResultItem
                title="The interest rate would be: "
                value={`${eligibilityResponse.recommendedLoan.interestRate}%`}
              />
              <LoanResultItem
                title="With a monthly payment of:"
                value={`R ${eligibilityResponse.recommendedLoan.monthlyPayment}`}
              />
              <LoanResultItem
                title="And a total loan amount of:"
                value={`R ${eligibilityResponse.recommendedLoan.totalRepayment}`}
              />
            </Stack>
            <div style={{ width: "800px" }}>
              <canvas id="amortisation" />
            </div>
          </Stack>
          <Stack marginTop={2} gap={2} direction="row">
            <Button onClick={handleRecheckEligibility} variant="contained">
              Recheck Eligibility{" "}
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <Typography variant="h6">
            Unfortunately you are not eligible for the loan.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default LoanResult;
