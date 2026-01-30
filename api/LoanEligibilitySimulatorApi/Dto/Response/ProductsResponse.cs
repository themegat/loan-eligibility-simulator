using System;

namespace LoanEligibilitySimulatorApi.Dto.Response;

public class InterestRateRange
{
    public double Min { get; set; }
    public double Max { get; set; }
}

public class Product
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public double MinAmount { get; set; }
    public double MaxAmount { get; set; }
    public int MinTerm { get; set; }
    public int MaxTerm { get; set; }
    public required InterestRateRange InterestRateRange { get; set; }
    public required List<string> Purposes { get; set; }
}

public class ProductsResponse
{
    public required List<Product> Products { get; set; }
}
