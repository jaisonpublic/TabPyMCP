from tabpy.tabpy_tools.client import Client
import time

def init_endpoints():
    max_retries = 5
    retry_delay = 2
    
    for attempt in range(max_retries):
        try:
            client = Client('http://localhost:9004')
            break
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"Failed to connect to TabPy server after {max_retries} attempts: {str(e)}")
                raise
            print(f"Attempt {attempt + 1} failed: {str(e)}, retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)

    # Pie Chart endpoint
    def create_pie_chart(data, labels, format='png'):
        import matplotlib.pyplot as plt
        plt.figure(figsize=(8, 8))
        plt.pie(data, labels=labels, autopct='%1.1f%%')
        plt.title('Pie Chart')
        return plt

    # Bar Graph endpoint
    def create_bar_graph(data, labels, format='png'):
        import matplotlib.pyplot as plt
        plt.figure(figsize=(10, 6))
        plt.bar(labels, data)
        plt.title('Bar Graph')
        return plt

    # Line Plot endpoint
    def create_line_plot(x_data, y_data, format='png'):
        import matplotlib.pyplot as plt
        plt.figure(figsize=(10, 6))
        plt.plot(x_data, y_data)
        plt.title('Line Plot')
        return plt

    # Deploy endpoints
    client.deploy('create_pie_chart', create_pie_chart, 'Creates a pie chart from data and labels')
    client.deploy('create_bar_graph', create_bar_graph, 'Creates a bar graph from data and labels')
    client.deploy('create_line_plot', create_line_plot, 'Creates a line plot from x and y data')

if __name__ == "__main__":
    init_endpoints()
