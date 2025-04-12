# Backend Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["RequestManagementAPI/RequestManagementAPI.csproj", "RequestManagementAPI/"]
RUN dotnet restore "RequestManagementAPI/RequestManagementAPI.csproj"
COPY . .
WORKDIR "/src/RequestManagementAPI"
RUN dotnet build "RequestManagementAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RequestManagementAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RequestManagementAPI.dll"]
