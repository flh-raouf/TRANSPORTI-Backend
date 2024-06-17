
//Tomorrow.io API

import pool from '../DB/connect.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const getWeatherCondition = (data) => {
    const { precipitationType, cloudCover, windSpeed } = data;

    if (precipitationType === 1) { // Snow
        return 'Neigeux';
    } else if (precipitationType === 2) { // Rain
        return 'Pluvieux';
    } else if (cloudCover > 70) { // Cloudy
        return 'Nuageux';
    } else if (windSpeed > 7) { // Windy
        return 'Venteux';
    } else { // Default to Sunny
        return 'Ensoleillé';
    }
};

const getWeather = async (req, res) => {
    try {
        // Extract barage_id from decoded token
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing or invalid' });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const barageId = decoded.barage_id;

        // Fetch City from database based on barageId
        const [barageRows] = await pool.query('SELECT City FROM barage_table WHERE barage_id = ?', [barageId]);

        if (barageRows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Barage not found' });
        }

        const City = barageRows[0].City;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        };

        const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${City}&units=metric&apikey=${process.env.TOMMOROW_API_KEY}`, options);
        const data = await response.json();

        if (response.ok) {
            const weatherCondition = getWeatherCondition(data.data.values);

            // Update the meteo column in the barage_table
            await pool.query('UPDATE barage_table SET meteo = ? WHERE barage_id = ?', [weatherCondition, barageId]);

            res.status(StatusCodes.OK).json({ weather: weatherCondition, data });
        } else {
            res.status(response.status).json({ error: data.message || 'Error fetching weather data' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default getWeather;












//OpenWeather API
/*
import pool from '../DB/connect.js';
import dotenv from 'dotenv';
import request from 'request';

dotenv.config();

// Function to map OpenWeather descriptions to our custom weather types
const mapWeatherToEnumeration = (weatherDescription) => {
    const description = weatherDescription.toLowerCase();

    if (description.includes('snow')) return 'Neigeux';
    if (description.includes('clear')) return 'Ensoleillé';
    if (description.includes('wind')) return 'Venteux';
    if (description.includes('rain') || description.includes('drizzle') || description.includes('thunderstorm')) return 'Pluvieux';
    if (description.includes('cloud')) return 'Nuageux';
    
    return 'Unknown';  // default case if no match
};

const getWeather = async (req, res) => {
    try {
        const barageId = req.body.barageId;
        const [barageRows] = await pool.query('SELECT City FROM barage_table WHERE barage_id = ?', [barageId]);

        if (barageRows.length === 0) {
            return res.status(404).json({ error: 'Barage not found' });
        }

        const City = barageRows[0].City;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${City},DZ&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

        request(url, (err, response, body) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const weather = JSON.parse(body);
            if (weather.main === undefined) {
                return res.status(404).json({ error: 'City not found or API error' });
            } else {
                const weatherDescription = weather.weather[0].main;
                const weatherEnum = mapWeatherToEnumeration(weatherDescription);

                return res.status(200).json({ 
                    weather: weather, 
                    customWeatherDescription: `The weather in ${weather.name} is currently ${weatherEnum}.`
                });
            }
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default getWeather;
*/