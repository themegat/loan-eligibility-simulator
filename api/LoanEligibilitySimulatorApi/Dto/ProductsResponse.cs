using System;

namespace LoanEligibilitySimulatorApi.Dto;

public class InterestRateRange
{
    public double Min { get; set; }
    public double Max { get; set; }
}

public class Product
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double MinAmount { get; set; }
    public double MaxAmount { get; set; }
    public int MinTerm { get; set; }
    public int MaxTerm { get; set; }
    public InterestRateRange InterestRateRange { get; set; }
    public List<string> Purposes { get; set; }
}

public class ProductsResponse
{
    public List<Product> Products { get; set; }
}
