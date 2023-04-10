from graph import graph

nodes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6']
edges = [['n1', 'n2', 5], 
         ['n1', 'n4', 6], 
         ['n1', 'n3', 3], 
         ['n2', 'n4', 4], 
         ['n2', 'n5', 2], 
         ['n2', 'n6', 2], 
         ['n3', 'n4', 2], 
         ['n3', 'n6', 8], 
         ['n5', 'n6', 7]]

G = graph(nodes, edges)
