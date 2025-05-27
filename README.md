# Frontend
BookBox application frontend

# Run locally
First run the backend - instructions [here](https://github.com/DreamTeamPAW/Frontend/issues/21).
Then install dependencies:
```powershell
npm install
```

And run the app:
```powershell
npm run dev
```
 Azure setup for automatic deployment

 1. Create resource group
 2. Create resource plan "App service plan"
    - Select a Free (F1) plan
 3. Create managed identity
    - Add a federated credential
    - Organization: DreamTeamPAW
    - Repository: Frontend
    - Entity: Branch
    - Branch: prod-frontend
 4. Set permissions
    - Go to resource group settings
    - Select access control
    - Set privileges to "Contributor"
    - Assign to created managed identity
5. Read necessary IDs for GitHub Actions
    - Open settings for managed identity
    - Select JSON view
    - Copy subscription id, tenant id, client id, and set it in GitHub Secrets
