FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY LoanEligibilitySimulatorApi/*.csproj ./api/
RUN dotnet restore ./api/*.csproj

COPY LoanEligibilitySimulatorApi/ ./api/
WORKDIR /src/api
RUN dotnet publish -c Release -o /out /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /out ./

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["dotnet", "LoanEligibilitySimulatorApi.dll"]
