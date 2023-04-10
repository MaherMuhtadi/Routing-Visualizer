class graph:
    '''
    A class for a simple graph containing nodes and positive weighted edges.
    Attributes:
        nodes (list): A list of nodes in the graph
        edges (list): A list of weighted edges connecteing the graph nodes
    Methods:
        addNode, removeNode, updateNode, addEdge, removeEdge, updateEdgeWeight
    '''


    def __init__(self, nodes:list, edges:list = []) -> None:
        '''
        Constructs a graph object by setting the nodes and edges
        Parameters:
            nodes (list): A list of nodes in the graph
            edges (list, optional): A list of weighted edges connecteing the graph nodes
        Returns:
            None
        '''

        self.nodes = list(set(nodes)) # Removes duplicate nodes before storing in self.nodes
        self.nodes.sort()
        self.edges = list(edges)
    

    def addNode(self, node) -> bool:
        '''
        Adds a new node to the graph
        Parameters:
            node (any type): A new node being added to the graph
        Returns:
            True (bool), if added
            False (bool), otherwise
        '''

        if node not in self.nodes:
            self.nodes.append(node)
            print(f"Node {node} added.")
            return True
        print(f"Node {node} already exists.")
        return False
    

    def removeNode(self, node) -> bool:
        '''
        Removes a node from the graph along with its incident edges
        Parameters:
            node (any type): A node being removed from the graph
        Returns:
            True (bool), if removed
            False (bool), otherwise
        '''

        if node in self.nodes:
            self.nodes.remove(node)
            self.__removeNodeEdge(node, self.edges.copy())
            print(f"Node {node} removed.")
            return True
        print(f"Node {node} does not exist.")
        return False


    def __removeNodeEdge(self, node, edges:list) -> None:
        '''
        Private helper method for removeNode. It removes the incident edges of a node from the graph.
        Parameters:
            node (any type): A node whose incident edges are being removed from the graph
            edges (list): A copy of the edges list of the graph
        Returns:
            None
        '''

        if len(edges) == 0:
            return
        if node in edges[0][:2]:
            self.edges.remove(edges[0])
        self.__removeNodeEdge(node, edges[1:])
    

    def updateNode(self, old_node, new_node) -> bool:
        '''
        Updates the name of an existing node in both nodes and edges attributes of the graph
        Parameters:
            old_node (any type): The node being updated
            new_node (any type): The updated node
        Returns:
            True (bool), if node updated
            False (bool), otherwise
        '''
        
        if old_node in self.nodes and new_node not in self.nodes:
            for edge in self.edges:
                if edge[0] == old_node:
                    edge[0] = new_node
                if edge[1] == old_node:
                    edge[1] = new_node
            j = self.nodes.index(old_node)
            self.nodes[j] = new_node
            print(f"Node {old_node} updated to {new_node}.")
            return True
        print(f"Node {old_node} does not exist or Node {new_node} already exists.")
        return False
    

    def addEdge(self, node_x, node_y, weight:int) -> bool:
        '''
        Adds a new non-looping and non-repeating edge to the graph
        Parameters:
            node_x (any type): First incident node of the edge
            node_y (any type): Second incident node of the edge
            weight (int, weight > 0): Weight of the edge
        Returns:
            True (bool), if added
            False (bool), otherwise
        '''

        if node_x not in self.nodes or node_y not in self.nodes:
            print("One or both of the nodes do not exist.")
            return False
        elif node_x == node_y:
            print("Looping edge averted. Please provide different nodes.")
            return False
        elif isinstance(weight, int) and weight > 0:
            not_in = True
            for edge in self.edges:
                if node_x in edge[:2] and node_y in edge[:2]:
                    not_in = False
                    break
            if not_in:
                self.edges.append([node_x, node_y, weight])
                print(f"Edge of weight {weight} from Node {node_x} to Node {node_y} added.")
                return True
            print(f"Edge from Node {node_x} to Node {node_y} already exists.")
            return False
        print("Invalid weight.")
        return False
    

    def removeEdge(self, node_x, node_y) -> bool:
        '''
        Removes an existing edge from the graph
        Parameters:
            node_x (any type): First incident node of the edge
            node_y (any type): Second incident node of the edge
        Returns:
            True (bool), if removed
            False (bool), otherwise
        '''

        for edge in self.edges:
            if node_x in edge[:2] and node_y in edge[:2]:
                self.edges.remove(edge)
                print(f"Edge from Node {node_x} to Node {node_y} removed.")
                return True
        print(f"Edge from Node {node_x} to Node {node_y} does not exist.")
        return False


    def updateEdgeWeight(self, node_x, node_y, weight:int) -> bool:
        '''
        Updates the weight of an existing edge in the graph
        Parameters:
            node_x (any type): First incident node of the edge
            node_y (any type): Second incident node of the edge
            weight (int): New weight of the edge
        Returns:
            True (bool), if updated
            False (bool), otherwise
        '''

        if isinstance(weight, int) and weight > 0:
            for i in range(len(self.edges)):
                if node_x in self.edges[i][:2] and node_y in self.edges[i][:2]:
                    self.edges[i] = [node_x, node_y, weight]
                    print(f"Weight of edge from Node {node_x} to Node {node_y} updated to {weight}.")
                    return True
            print(f"Edge from Node {node_x} to Node {node_y} does not exist.")
            return False
        print("Invalid weight.")
        return False