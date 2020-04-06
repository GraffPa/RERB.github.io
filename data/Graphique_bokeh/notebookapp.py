#!/usr/bin/env python
# coding: utf-8

# In[ ]:



'''
Graphique de la densité de population le long du RER B dans le temps 
'''

# Importation des packages 
import pandas as pd
import numpy as np
import math
import mapclassify as mc
import os
import geopandas as gpd
import json
from bokeh.io import output_notebook, show, output_file
from bokeh.plotting import figure
from bokeh.models import GeoJSONDataSource, LinearColorMapper, ColorBar, NumeralTickFormatter, LogColorMapper, GMapPlot, GMapOptions, ColumnDataSource
from bokeh.palettes import brewer, all_palettes
from bokeh.io.doc import curdoc
from bokeh.models import Slider, HoverTool, Select, TextInput, Label, LabelSet
from bokeh.layouts import widgetbox, row, column
from bokeh.application import Application
from bokeh.application.handlers import FunctionHandler
from geopandas.tools import sjoin

# Nettoyage des données 
#  Communes 
direct = os.getcwd()
communes = gpd.read_file(direct +'/shapefile/communes_modif.shp')
communes=communes.set_geometry('geometry')
paris =gpd.read_file(direct + '/shapefile/arrondissements.shp')
paris['c_arinsee']=paris['c_arinsee'].astype(int)
paris=paris[['c_arinsee','l_ar','geometry']]
paris=paris.rename(columns={"c_arinsee": "insee", "l_ar": "nom"})
paris['insee']=paris['insee'].astype(str)
communes = communes.append(paris)

#correspondance changements rer et population dates dispo (pour l'instant)
merge_year = pd.DataFrame({'year_rer':[1937,1977,1981,2017],'year_pop':[1946,1975,1982,2017],
                        'steps':[1,2,3,4]})

# Population 
pop = gpd.read_file(direct + '/shapefile/donnees-communales-sur-la-population-dile-de-france.shp')
pop.insee=pop.insee.astype(int)
pop.insee=pop.insee.astype(str)
pop=pop[pop['insee'].str.startswith(('75','78','91','77','92','94','95','93'))]  
pop=pop[['insee','pop1946','psdc1975','psdc1982','popmun2017']]
pop=pop.rename(columns={'pop1946':'1946','psdc1975':'1975','psdc1982':'1982','popmun2017':'2017'})
pop=pd.melt(pop, id_vars=['insee'])
pop=pop.rename(columns={'value':'population'})
pop=pop.rename(columns={'variable':'year'})
pop.year=pop.year.astype(int)
pop=pop.merge(merge_year,left_on='year',right_on='year_pop')

# Tracé RER 
rer  = gpd.read_file(direct + '/shapefile/traces-du-reseau-ferre-idf.shp') 
rer= rer[rer.reseau=='RER B']
rer=rer.set_geometry('geometry')

# Stations nom 
stations  = gpd.read_file(direct + '/shapefile/emplacement-des-gares-idf-data-generalisee.shp') 
stations=stations[stations['res_com'].str.contains("RER B")]
stations=stations[['nom_long','geometry']]
stations=stations[['nom_long','geometry']]
rer= rer[['objectid','geometry']]
merging=pd.read_csv(direct + '/merging_file.csv')
stations=stations.merge(merging,on='nom_long')


# On réduit la zone de graph 
circle_rer = gpd.GeoDataFrame(crs=None, geometry=rer.geometry.buffer(0.12))
communes_rer = sjoin(communes, circle_rer, how='inner',op='within',lsuffix='lft',rsuffix='rgt')
communes_rer.dropna()
communes_rer.drop_duplicates(subset='insee',inplace = True) 
communes_rer=communes_rer[['insee','nom','geometry']]
communes=communes_rer


# Dessin pour le tracé du RER en fonction des années, fait à la main 
stations_nom_liste=[]
for i in stations.nom_long:
    stations_nom_liste.append(i)
    
nom_long_1937=['MASSY-PALAISEAU','LE GUICHET','LOZERE','PALAISEAU-VILLEBON','PALAISEAU','SAINT-REMY-LES-CHEVREUSE',
               'COURCELLE-SUR-YVETTE','LA HACQUINIERE','ORSAY-VILLE','GIF-SUR-YVETTE','BURES-SUR-YVETTE','MASSY-VERRIERES',
              'FONTAINE-MICHALON','ANTONY','LA CROIX-DE-BERNY-FRESNES','PARC-DE-SCEAUX','BOURG-LA-REINE','BAGNEUX',
              'ARCUEIL-CACHAN','LAPLACE','GENTILLY','CITE UNIVERSITAIRE','DENFERT-ROCHEREAU','PORT ROYAL','LES BACONNETS']
nom_long_1977=nom_long_1937+['LUXEMBOURG','SAINT-MICHEL']
nom_long_1981=nom_long_1977+ ['CHATELET-LES HALLES'] #['GARE DU NORD']
nom_long_2017 = stations_nom_liste
list_year = [nom_long_1937, nom_long_1977,nom_long_1981,nom_long_2017]
append_stations=pd.DataFrame(columns=['nom_long','geometry','objectid','year'])
append_rer=pd.DataFrame(columns=['objectid','geometry','year'])

for i in range(len(merge_year.year_rer.tolist())):
    data_stations=stations
    data_stations=data_stations.assign(year=merge_year.year_rer.tolist()[i])
    data_stations=data_stations[data_stations.nom_long.isin(list_year[i])]
    append_stations=append_stations.append(data_stations)
    append_stations.year=append_stations.year.astype(int) 
    data_rer=rer.assign(year=merge_year.year_rer.tolist()[i])
    data_rer=data_rer[data_rer.objectid.isin(data_stations.objectid.tolist())]
    append_rer=append_rer.append(data_rer)
    append_rer.year=append_rer.year.astype(int)


append_rer=append_rer.merge(merge_year,left_on='year',right_on='year_rer',how='left')
append_stations=append_stations.merge(merge_year,left_on='year',right_on='year_rer',how='left')
append_rer=append_rer.set_geometry('geometry')
append_stations=append_stations.set_geometry('geometry')

def json_data(selectedYear):
    yr = selectedYear
    df_pop = pop[pop['steps'] == yr]
    merged = communes.merge(df_pop, on = 'insee', how = 'left')
    merged=merged.assign(densite=merged.population/merged.geometry.area)
    merged_json = json.loads(merged.to_json())
    json_data = json.dumps(merged_json)
    return json_data

def json_data_rer(selectedYear):
    yr = selectedYear
    df_rer = append_rer[append_rer['steps'] == yr]
    merged_json = json.loads(df_rer.to_json())
    json_data = json.dumps(merged_json)
    return json_data

def json_data_stations(selectedYear):
    yr = selectedYear
    df_stations = append_stations[append_stations['steps'] == yr]
    merged_json = json.loads(df_stations.to_json())
    json_data = json.dumps(merged_json)
    return json_data

#Input GeoJSON 
geosource = GeoJSONDataSource(geojson = json_data(4))
rersource=GeoJSONDataSource(geojson = json_data_rer(4))
stationssource=GeoJSONDataSource(geojson = json_data_stations(4))

#Color palette.
palette = brewer['Reds'][8]
palette = palette[::-1]
high_value = pd.merge(communes, pop, on='insee').assign(densite=pd.merge(communes, pop, on='insee').population/pd.merge(communes, pop, on='insee').geometry.area).densite.max()
color_mapper = LinearColorMapper(palette = palette, low = 0, high = high_value, nan_color = '#d9d9d9')

# Créer plot 
p = figure(title = 'Population le long du RER B, 2017', plot_height = 600 , plot_width = 950)
p.title.text_color = "gray"
p.title.text_font = "arial"
p.title.text_font_style = "italic"
p.title.text_font_size = "20pt"
p.xgrid.grid_line_color = None
p.ygrid.grid_line_color = None
p.patches('xs','ys', source = geosource, fill_color = {'field' : 'densite', 'transform' : color_mapper},
          line_color = 'black', line_width = 0.25, fill_alpha = 1)

p.multi_line('xs', 'ys', source=rersource, color='#4B92DB', line_width=5)

circle=p.circle('x', 'y', size=4, source=stationssource, color="white")

label_text=Label(x=2,y=49,text='2017',text_font_size='16pt')
#labels = LabelSet(x='weight', y='height', text='names', level='glyph',
            #  x_offset=5, y_offset=5, source=source, render_mode='canvas')
p.add_layout(label_text)

phover = HoverTool(renderers=[circle])
phover.tooltips=[('stations','@nom_long')]

p.add_tools(phover)

def update_plot(attr, old, new):
    yr = slider.value
    new_data = json_data(yr)
    geosource.geojson = new_data
    new_data_rer=json_data_rer(yr)
    rersource.geojson = new_data_rer
    new_data_stations=json_data_stations(yr)
    stationssource.geojson = new_data_stations
    yr_real = merge_year[merge_year['steps']==yr].year_rer
    p.title.text = 'Population le long du RER B, %d' %yr_real
    label_text.text=  str(int(yr_real))


slider = Slider(title = 'Year',start = 1, end = 4, step = 1, value = 4)
slider.on_change('value', update_plot)

inputs=widgetbox(slider)
#layout = column(p,widgetbox(slider))

curdoc().add_root(row(inputs, p, width=800))
curdoc().title = "POP"


# In[ ]:




