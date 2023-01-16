install:  monitoring application argocd

application: application-dependencies
	helm install application ./chart -f ./chart/values.yaml -n staging --create-namespace
application-dependencies:
	helm dependency update ./chart

argocd: argo-cd-dependencies
	helm install argo-cd ./argo-cd-chart -n argocd --create-namespace
argo-cd-dependencies:
	helm dependency update ./argo-cd-chart

monitoring: monitoring-dependencies
	helm install monitoring ./monitoring-chart -f ./monitoring-chart/values.yaml -n monitoring --create-namespace
monitoring-dependencies:
	helm dependency update ./monitoring-chart

uninstall: uninstall-monitoring uninstall-application uninstall-argocd 
	
uninstall-argocd:
	helm uninstall argocd -n argocd

uninstall-monitoring:
	helm uninstall monitoring -n monitoring
	
uninstall-application:
	helm uninstall application -n staging